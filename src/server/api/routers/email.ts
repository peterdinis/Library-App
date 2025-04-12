import { z } from "zod";
import { format, parseISO } from "date-fns";
import { sendEmail } from "~/lib/mails/mailer";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const emailRouter = createTRPCRouter({
  sendAfterBorrowed: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        bookTitle: z.string(),
        dueDate: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const subject = "Požičanie knihy";
      const formattedDueDate = format(parseISO(input.dueDate), "d.M.yyyy");

      const message = `Dobrý deň,\n\nkniha "${input.bookTitle}" bola úspešne požičaná.\nTermín vrátenia: ${formattedDueDate}.\n\nĎakujeme, SPŠT Knižnica.`;

      await sendEmail({ email: input.email, subject, message });
    }),

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