import { z } from "zod";
import { sendEmail } from "~/lib/mails/mailer";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

async function getUserState(email: string) {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user || !user.lastActivityDate) return "non-active";

  const now = new Date();
  const timeDiff = now.getTime() - user.lastActivityDate.getTime();

  if (timeDiff > THREE_DAYS_IN_MS && timeDiff <= THIRTY_DAYS_IN_MS) {
    return "non-active";
  }

  return "active";
}

async function startUserEngagementWorkflow(email: string, fullName: string) {
  // Immediate welcome email
  await sendEmail({
    email,
    subject: "Welcome to the platform",
    message: `Welcome ${fullName}!`,
  });

  // Wait 3 days
  await new Promise((res) => setTimeout(res, THREE_DAYS_IN_MS));

  while (true) {
    const state = await getUserState(email);

    if (state === "non-active") {
      await sendEmail({
        email,
        subject: "Are you still there?",
        message: `Hey ${fullName}, we miss you!`,
      });
    } else if (state === "active") {
      await sendEmail({
        email,
        subject: "Welcome back!",
        message: `Welcome back ${fullName}!`,
      });
    }

    await new Promise((res) => setTimeout(res, THIRTY_DAYS_IN_MS));
  }
}

export const workflowRouter = createTRPCRouter({
  trigger: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        fullName: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { email, fullName } = input;

      // Start async background job (e.g. via queue or worker thread)
      // Here we call it directly for simplicity, but ideally you'd hand this off to a job queue.
      startUserEngagementWorkflow(email, fullName)
        .then(() => console.log("Workflow started"))
        .catch((err) => console.error("Workflow error:", err));

      return { message: "Workflow initiated." };
    }),
});
