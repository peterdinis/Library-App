import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const adminRouter = createTRPCRouter({
  searchAll: publicProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ input }) => {
      const { query } = input;

      const [userRes, bookRes, authorRes, bookingRes, genreRes, categoryRes] =
        await Promise.all([
          db.user.findMany({
            where: {
              OR: [
                { fullName: { contains: query, mode: "insensitive" } },
                { email: { contains: query, mode: "insensitive" } },
              ],
            },
          }),
          db.book.findMany({
            where: {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
                { summary: { contains: query, mode: "insensitive" } },
              ],
            },
          }),
          db.author.findMany({
            where: {
              OR: [
                { name: { contains: query, mode: "insensitive" } },
                { bio: { contains: query, mode: "insensitive" } },
              ],
            },
          }),
          db.booking.findMany({
            where: {
              OR: [{ className: { contains: query, mode: "insensitive" } }],
            },
          }),
          db.genre.findMany({
            where: {
              name: { contains: query, mode: "insensitive" },
            },
          }),
          db.category.findMany({
            where: {
              name: { contains: query, mode: "insensitive" },
            },
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
