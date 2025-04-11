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
    return await db.booking.findMany({
      include: {
        book: { select: { title: true } },
        user: { select: { email: true } },
      },
    });
  }),

  searchBookings: protectedProcedure
    .input(
      z.object({
        query: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      return await db.booking.findMany({
        where: {
          OR: [
            {
              user: {
                fullName: {
                  contains: input.query,
                  mode: "insensitive",
                },
              },
            },
            {
              book: {
                title: {
                  contains: input.query,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
        include: {
          user: true,
          book: true,
        },
      });
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
          status: {
            not: "RETURNED",
          },
        },
        include: {
          book: true,
        },
      });

      if (!bookings || bookings.length === 0 || !input.userId) {
        return {
          books: [],
          bookings: [],
        };
      }

      const books = bookings.map((booking) => booking.book);

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

  updateBooking: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string().optional(),
        bookId: z.string().optional(),
        className: z.string().optional(),
        status: z.enum(["BORROWED", "RETURNED", "CANCELLED"]).optional(),
        dueDate: z.string().datetime().optional(),
        borrowDate: z.string().datetime().optional(),
        returnDate: z.string().datetime().nullable().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const existing = await db.booking.findUnique({ where: { id: input.id } });

      if (!existing) {
        throw new Error("Booking not found.");
      }

      const {
        id,
        userId,
        bookId,
        className,
        status,
        dueDate,
        borrowDate,
        returnDate,
      } = input;

      const updated = await db.booking.update({
        where: { id },
        data: {
          userId,
          bookId,
          className,
          dueDate: dueDate ? parseISO(dueDate) : undefined,
          borrowDate: borrowDate ? parseISO(borrowDate) : undefined,
          returnDate: returnDate ? parseISO(returnDate) : undefined,
        },
      });

      return updated;
    }),

  deleteBooking: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const booking = await db.booking.findUnique({
        where: { id: input.id },
      });

      if (!booking) {
        throw new Error("Booking not found.");
      }

      return await db.booking.delete({
        where: { id: input.id },
      });
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
          bookId: input.bookId,
        },
      });

      if (!booking || booking.status === "RETURNED") {
        throw new Error("Invalid booking or already returned.");
      }

      const returnDate = parseISO(input.returnDate);

      if (isBefore(returnDate, booking.borrowDate)) {
        throw new Error("Return date cannot be earlier than the borrow date.");
      }

      const updatedBooking = await db.booking.update({
        where: { id: booking.id },
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
          bookId: bookInfo!.id,
        },
      });

      return updatedBooking;
    }),

  deleteAllBookings: protectedProcedure.query(async () => {
    return await db.booking.deleteMany();
  }),
});
