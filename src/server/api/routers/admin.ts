import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const adminRouter = createTRPCRouter({
  searchAll: publicProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ input }) => {
      const { query } = input;

      const searchQuery = query.trim().toLowerCase();

      if (!searchQuery || searchQuery.length < 2) {
        return {
          users: [],
          books: [],
          authors: [],
          bookings: [],
          genres: [],
          categories: [],
        };
      }

      const [userRes, bookRes, authorRes, bookingRes, genreRes, categoryRes] =
        await Promise.all([
          db.user.findMany({
            where: {
              OR: [
                { fullName: { contains: searchQuery, mode: "insensitive" } },
                { email: { contains: searchQuery, mode: "insensitive" } },
              ],
            },
            select: {
              id: true,
              fullName: true,
              email: true,
              role: true,
            },
            take: 10,
          }),
          db.book.findMany({
            where: {
              OR: [
                { title: { contains: searchQuery, mode: "insensitive" } },
                { description: { contains: searchQuery, mode: "insensitive" } },
                { summary: { contains: searchQuery, mode: "insensitive" } },
              ],
            },
            select: {
              id: true,
              title: true,
            },
            take: 10,
          }),
          db.author.findMany({
            where: {
              OR: [
                { name: { contains: searchQuery, mode: "insensitive" } },
                { bio: { contains: searchQuery, mode: "insensitive" } },
              ],
            },
            select: {
              id: true,
              name: true,
            },
            take: 10,
          }),
          db.booking.findMany({
            where: {
              className: { contains: searchQuery, mode: "insensitive" },
            },
            select: {
              id: true,
              className: true,
            },
            take: 10,
          }),
          db.genre.findMany({
            where: {
              name: { contains: searchQuery, mode: "insensitive" },
            },
            select: {
              id: true,
              name: true,
            },
            take: 10,
          }),
          db.category.findMany({
            where: {
              name: { contains: searchQuery, mode: "insensitive" },
            },
            select: {
              id: true,
              name: true,
            },
            take: 10,
          }),
        ]);

      return {
        users: userRes,
        books: bookRes,
        authors: authorRes,
        bookings: bookingRes,
        genres: genreRes,
        categories: categoryRes,
      };
    }),

  setAdminRole: publicProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input }) => {
      const user = await db.user.findUnique({ where: { id: input.userId } });

      if (!user) {
        throw new Error("Používateľ neexistuje.");
      }

      if (user.role !== "TEACHER") {
        throw new Error(
          "Iba používateľ s rolou TEACHER môže byť povýšený na ADMIN.",
        );
      }

      const updatedUser = await db.user.update({
        where: { id: input.userId },
        data: { role: "ADMIN" },
      });

      return {
        message: "Rola bola úspešne zmenená na ADMIN.",
        user: {
          id: updatedUser.id,
          fullName: updatedUser.fullName,
          role: updatedUser.role,
        },
      };
    }),

  removeAdminRole: publicProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input }) => {
      const user = await db.user.findUnique({ where: { id: input.userId } });

      if (!user) {
        throw new Error("Používateľ neexistuje.");
      }

      if (user.role !== "ADMIN") {
        throw new Error(
          "Iba používateľ s rolou ADMIN môže byť znížený na TEACHER.",
        );
      }

      const updatedUser = await db.user.update({
        where: { id: input.userId },
        data: { role: "TEACHER" },
      });

      return {
        message: "Rola ADMIN bola odstránená a zmenená na TEACHER.",
        user: {
          id: updatedUser.id,
          fullName: updatedUser.fullName,
          role: updatedUser.role,
        },
      };
    }),
});
