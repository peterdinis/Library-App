import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import z from "zod";

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
      const oneUser = await db.user.findFirst({
        where: {
          id: input.userId,
        },
      });

      const allUsersBooking = await db.borrowRecord.findMany({
        where: {
          userId: oneUser!.id,
        },
      });

      return allUsersBooking;
    }),

  getDetailOfUserBooking: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        bookingId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const oneUser = await db.user.findFirst({
        where: {
          id: input.userId,
        },
      });

      const borrowedBookDetail = await db.borrowRecord.findFirst({
        where: {
          userId: oneUser!.id,
          id: input.bookingId,
        },
      });

      return borrowedBookDetail;
    }),

    createBooking: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        bookId: z.string(),
        dueDate: z.string().datetime(),
      })
    )
    .mutation(async ({ input }) => {
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
          dueDate: new Date(input.dueDate),
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
      })
    )
    .mutation(async ({ input }) => {
      const borrowRecord = await db.borrowRecord.findUnique({
        where: { id: input.bookingId },
      });

      if (!borrowRecord || borrowRecord.status === "RETURNED") {
        throw new Error("Invalid booking or already returned.");
      }

      const updatedBooking = await db.borrowRecord.update({
        where: { id: input.bookingId },
        data: {
          returnDate: new Date(),
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
    })
});
