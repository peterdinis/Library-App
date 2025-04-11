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

const workflowState: Record<string, boolean> = {};

async function getUserState(email: string) {
  console.log(`[getUserState] Checking activity for ${email}`);

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log(`[getUserState] User not found: ${email}`);
    return "non-active";
  }

  if (!user.lastActivityDate) {
    console.log(`[getUserState] No activity date found for ${email}`);
    return "non-active";
  }

  const now = new Date();
  const timeDiff = now.getTime() - user.lastActivityDate.getTime();

  console.log(`[getUserState] Time diff for ${email} is ${timeDiff}ms`);

  if (timeDiff > THREE_DAYS_IN_MS && timeDiff <= THIRTY_DAYS_IN_MS) {
    return "non-active";
  }

  return "active";
}

async function startUserEngagementWorkflow(email: string) {
  if (workflowState[email]) {
    console.log(`[startWorkflow] Workflow already running for ${email}`);
    return;
  }

  workflowState[email] = true;
  console.log(`[startWorkflow] Starting workflow for ${email}`);

  try {
    console.log(`[startWorkflow] Sending welcome email to ${email}`);
    await sendEmail({
      email,
      subject: "Welcome to the platform",
      message: `Welcome ${email}!`,
    });

    console.log(`[startWorkflow] Waiting 3 days before next step...`);
    await new Promise((res) => setTimeout(res, THREE_DAYS_IN_MS));

    const maxCycles = 6;
    let cycles = 0;

    while (cycles < maxCycles) {
      console.log(`[startWorkflow] Cycle ${cycles + 1} for ${email}`);
      const state = await getUserState(email);

      if (state === "non-active") {
        console.log(`[startWorkflow] User ${email} is non-active, sending re-engagement email`);
        await sendEmail({
          email,
          subject: "Are you still there?",
          message: `Hey ${email}, we miss you!`,
        });
      } else if (state === "active") {
        console.log(`[startWorkflow] User ${email} is active, sending welcome back email`);
        await sendEmail({
          email,
          subject: "Welcome back!",
          message: `Welcome back ${email}!`,
        });
      }

      cycles++;
      console.log(`[startWorkflow] Waiting 30 days before next cycle for ${email}...`);
      await new Promise((res) => setTimeout(res, THIRTY_DAYS_IN_MS));
    }

    console.log(`[startWorkflow] Finished all cycles for ${email}`);
  } catch (err) {
    console.error(`[startWorkflow] Error for ${email}:`, err);
  } finally {
    workflowState[email] = false;
    console.log(`[startWorkflow] Workflow reset for ${email}`);
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
      try {
        const { email } = input;
        console.log(`[trigger] Received trigger for ${email}`);

        startUserEngagementWorkflow(email)
          .then(() => console.log(`[trigger] Workflow started for ${email}`))
          .catch((err) => console.error(`[trigger] Workflow error for ${email}:`, err));

        return { message: "Workflow initiated." };
      } catch (error) {
        console.error("[trigger] Unexpected error:", error);
        throw new Error("Failed to start workflow.");
      }
    }),
});
