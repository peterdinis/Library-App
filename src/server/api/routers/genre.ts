import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const genreRouter = createTRPCRouter({
  getAllGenres: publicProcedure.query(() =>
    db.genre.findMany({
      select: {
        id: true,
        name: true,
      },
    })
  ),

  getGenreDetail: publicProcedure
    .input(z.string())
    .query(({ input }) =>
      db.genre.findUnique({
        where: { id: input },
        select: {
          id: true,
          name: true,
        },
      })
    ),

  searchGenres: publicProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(({ input }) =>
      db.genre.findMany({
        where: {
          name: {
            contains: input.query,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          name: true,
        },
      })
    ),

  createGenre: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => db.genre.create({ data: input })),

  updateGenre: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return db.genre.update({
        where: { id },
        data,
      });
    }),

  deleteGenre: protectedProcedure
    .input(z.string())
    .mutation(({ input }) => db.genre.delete({ where: { id: input } })),
});
