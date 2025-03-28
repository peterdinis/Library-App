import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const genreRouter = createTRPCRouter({
  getAllGenres: publicProcedure.query(async () => {
    return await db.genre.findMany();
  }),

  getGenreDetail: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await db.genre.findUnique({
      where: { id: input },
    });
  }),
  searchGenres: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      return await db.genre.findMany({
        where: {
          name: {
            contains: input.query,
            mode: "insensitive",
          },
        },
      });
    }),
  createGenre: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await db.genre.create({ data: input });
    }),
  updateGenre: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await db.genre.update({ where: { id: input.id }, data: input });
    }),
  deleteGenre: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await db.genre.delete({ where: { id: input } });
    }),
});
