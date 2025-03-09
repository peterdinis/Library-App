import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import z from "zod";
import { isBefore, parseISO } from "date-fns";

export const bookingRouter = createTRPCRouter({
  getAllBookings: publicProcedure.query(async () => {
    return await db.borrowRecord.findMany();
  }),

  getBookingDetail: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.borrowRecord.findUnique({
        where: { id: input },
      });
    }),

  getAllUsersBookings: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await db.borrowRecord.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),

  getDetailOfUserBooking: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        bookingId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await db.borrowRecord.findFirst({
        where: {
          userId: input.userId,
          id: input.bookingId,
        },
      });
    }),

  createBooking: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        bookId: z.string(),
        dueDate: z.string().datetime(),
      }),
    )
    .mutation(async ({ input }) => {
      const borrowDate = new Date();
      const dueDate = parseISO(input.dueDate);

      if (isBefore(dueDate, borrowDate)) {
        throw new Error("Due date cannot be earlier than the borrow date.");
      }

      const book = await db.book.findUnique({
        where: { id: input.bookId },
      });

      if (!book || book.availableCopies <= 0) {
        throw new Error("Book is not available for borrowing.");
      }

      const newBooking = await db.borrowRecord.create({
        data: {
          userId: input.userId,
          bookId: input.bookId,
          borrowDate,
          dueDate,
          status: "BORROWED",
        },
      });

      await db.book.update({
        where: { id: input.bookId },
        data: {
          availableCopies: book.availableCopies - 1,
        },
      });

      return newBooking;
    }),

  returnBooking: publicProcedure
    .input(
      z.object({
        bookingId: z.string(),
        returnDate: z.string().datetime(),
      }),
    )
    .mutation(async ({ input }) => {
      const borrowRecord = await db.borrowRecord.findUnique({
        where: { id: input.bookingId },
      });

      if (!borrowRecord || borrowRecord.status === "RETURNED") {
        throw new Error("Invalid booking or already returned.");
      }

      const returnDate = parseISO(input.returnDate);

      if (isBefore(returnDate, borrowRecord.borrowDate)) {
        throw new Error("Return date cannot be earlier than the borrow date.");
      }

      const updatedBooking = await db.borrowRecord.update({
        where: { id: input.bookingId },
        data: {
          returnDate,
          status: "RETURNED",
        },
      });

      await db.book.update({
        where: { id: borrowRecord.bookId },
        data: {
          availableCopies: { increment: 1 },
        },
      });

      return updatedBooking;
    }),

  deleteAllBookings: publicProcedure.query(async () => {
    return await db.borrowRecord.deleteMany();
  }),
});
