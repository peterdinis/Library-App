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
        bookId: z.string(),
        returnDate: z.string().datetime(),
      }),
    )
    .mutation(async ({ input }) => {

      const bookInfo = await db.book.findUnique({
        where: { id: input.bookId },
      });

      const booking = await db.booking.findFirst({
        where: {
          bookId: input.bookId
        }
      });

      if (!booking || booking.status === "RETURNED") {
        throw new Error("Invalid booking or already returned.");
      }

      const returnDate = parseISO(input.returnDate);

      if (isBefore(returnDate, booking.borrowDate)) {
        throw new Error("Return date cannot be earlier than the borrow date.");
      }

      const updatedBooking = await db.booking.update({
        where: { id: booking.id},
        data: {
          returnDate,
          bookId: bookInfo!.id,
          status: "RETURNED",
        },
      });

      await db.book.update({
        where: { id: bookInfo!.id },
        data: {
          isAvaible: true,
          availableCopies: { increment: 1 },
        },
      });

      await db.booking.delete({
        where: {
          id: booking.id,
          bookId: bookInfo!.id
        }
      })

      return updatedBooking;
    }),

  deleteAllBookings: protectedProcedure.query(async () => {
    return await db.booking.deleteMany();
  }),
});
