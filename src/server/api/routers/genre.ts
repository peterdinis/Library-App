import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const genreRouter = createTRPCRouter({
  // Get all genres
  getAllGenres: publicProcedure.query(async () => {
    return await db.genre.findMany();
  }),

  // Get genre detail
  getGenreDetail: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await db.genre.findUnique({
      where: { id: input },
    });
  }),

  // Create genre
  createGenre: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await db.genre.create({ data: input });
    }),

  // Update genre
  updateGenre: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await db.genre.update({ where: { id: input.id }, data: input });
    }),

  // Delete genre
  deleteGenre: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await db.genre.delete({ where: { id: input } });
  }),
});
