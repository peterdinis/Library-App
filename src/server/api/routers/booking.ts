import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import z from "zod";
import { isBefore, parseISO } from "date-fns";

export const bookingRouter = createTRPCRouter({
  getAllBookings: protectedProcedure.query(async () => {
    return await db.booking.findMany();
  }),

  getBookingDetail: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.booking.findUnique({
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
      const bookings = await db.booking.findMany({
        where: {
          userId: input.userId,
          AND: {
            status: {
              not: "RETURNED"
            }
          }
        },
        include: {
          book: true,
        },
      });

      const books = bookings.flatMap((booking) => booking.book);

      return {
        books,
        bookings,
      };
    }),

  getDetailOfUserBooking: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        bookingId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await db.booking.findFirst({
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
        className: z.string(),
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

      const newBooking = await db.booking.create({
        data: {
          userId: input.userId,
          bookId: input.bookId,
          borrowDate,
          className: input.className,
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
      const booking = await db.booking.findUnique({
        where: { id: input.bookingId },
      });

      if (!booking || booking.status === "RETURNED") {
        throw new Error("Invalid booking or already returned.");
      }

      const returnDate = parseISO(input.returnDate);

      if (isBefore(returnDate, booking.borrowDate)) {
        throw new Error("Return date cannot be earlier than the borrow date.");
      }

      const updatedBooking = await db.booking.update({
        where: { id: input.bookingId },
        data: {
          returnDate,
          status: "RETURNED",
        },
      });

      await db.book.update({
        where: { id: booking.bookId },
        data: {
          availableCopies: { increment: 1 },
        },
      });

      return updatedBooking;
    }),

  deleteAllBookings: protectedProcedure.query(async () => {
    return await db.booking.deleteMany();
  }),
});
