import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const authorRouter = createTRPCRouter({
  // Get all authors
  getAllAuthors: publicProcedure.query(async () => {
    return await db.author.findMany();
  }),

  // Get author detail
  getAuthorDetail: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.author.findUnique({
        where: { id: input },
      });
    }),

  // Create author
  createAuthor: publicProcedure
    .input(
      z.object({
        name: z.string(),
        bio: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await db.author.create({ data: input });
    }),

  // Update author
  updateAuthor: publicProcedure
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

  // Delete author
  deleteAuthor: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await db.author.delete({ where: { id: input } });
    }),
});
