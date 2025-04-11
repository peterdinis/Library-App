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

const workflowState: Record<string, boolean> = {}; // In-memory tracker – replace with Redis or DB in prod

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

async function startUserEngagementWorkflow(email: string) {
  if (workflowState[email]) {
    console.log(`Workflow for ${email} is already running.`);
    return;
  }

  workflowState[email] = true;

  try {
    await sendEmail({
      email,
      subject: "Welcome to the platform",
      message: `Welcome ${email}!`,
    });

    await new Promise((res) => setTimeout(res, THREE_DAYS_IN_MS));

    // Optional: Limit the number of cycles
    const maxCycles = 6;
    let cycles = 0;

    while (cycles < maxCycles) {
      const state = await getUserState(email);

      if (state === "non-active") {
        await sendEmail({
          email,
          subject: "Are you still there?",
          message: `Hey ${email}, we miss you!`,
        });
      } else if (state === "active") {
        await sendEmail({
          email,
          subject: "Welcome back!",
          message: `Welcome back ${email}!`,
        });
      }

      cycles++;
      await new Promise((res) => setTimeout(res, THIRTY_DAYS_IN_MS));
    }
  } catch (err) {
    console.error("Workflow error:", err);
  } finally {
    workflowState[email] = false;
  }
}

export const workflowRouter = createTRPCRouter({
  trigger: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input }) => {
      const { email } = input;

      // NOTE: Ideally offload this to a job queue (like BullMQ or a background worker)
      startUserEngagementWorkflow(email)
        .then(() => console.log(`Workflow started for ${email}`))
        .catch((err) => console.error("Workflow error:", err));

      return { message: "Workflow initiated." };
    }),
});
