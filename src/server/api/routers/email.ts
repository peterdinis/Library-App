import { z } from "zod";
import { sendEmail } from "~/lib/mails/mailer";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const emailRouter = createTRPCRouter({
  sendAfterBorrowed: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        bookTitle: z.string(),
        dueDate: z.string(), // napr. "2025-04-20"
      }),
    )
    .mutation(async ({ input }) => {
      const subject = "Požičanie knihy";
      const message = `Dobrý deň,\n\nkniha "${input.bookTitle}" bola úspešne požičaná.\nTermín vrátenia: ${input.dueDate}.\n\nĎakujeme, SPŠT Knižnica.`;

      await sendEmail({ email: input.email, subject, message });
    }),

  // ✅ Email po vrátení knihy
  sendAfterReturned: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        bookTitle: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const subject = "Vrátenie knihy";
      const message = `Dobrý deň,\n\nkniha "${input.bookTitle}" bola úspešne vrátená.\n\nĎakujeme, SPŠT Knižnica.`;

      await sendEmail({ email: input.email, subject, message });
    }),
});
