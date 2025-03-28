import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const authorRouter = createTRPCRouter({
  getAllAuthors: publicProcedure.query(async () => {
    return await db.author.findMany();
  }),

  getAuthorDetail: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.author.findUnique({
        where: { id: input },
      });
    }),

  searchAuthors: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      return await db.author.findMany({
        where: {
          name: {
            contains: input.query,
            mode: "insensitive",
          },
        },
      });
    }),

  createAuthor: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        bio: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await db.author.create({ data: input });
    }),

  updateAuthor: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        bio: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await db.author.update({ where: { id: input.id }, data: input });
    }),

  deleteAuthor: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await db.author.delete({ where: { id: input } });
    }),
});
