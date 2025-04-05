import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const adminRouter = createTRPCRouter({
  searchAll: publicProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ input }) => {
      const { query } = input;

      const searchQuery = query.trim().toLowerCase();

      // Use limit and select only necessary fields
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
            },
            take: 10, // limit to avoid returning too many users
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
              OR: [{ className: { contains: searchQuery, mode: "insensitive" } }],
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
});