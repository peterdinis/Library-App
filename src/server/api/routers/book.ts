import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const bookRouter = createTRPCRouter({
  // Get all books
  getAllBooks: publicProcedure.query(async () => {
    return await db.book.findMany();
  }),

  // Get book detail
  getBookDetail: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await db.book.findUnique({
      where: { id: input },
    });
  }),

  // Quick search book
  quickSearchBook: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.book.findMany({
        where: {
          OR: [{ title: { contains: input } }, { author: { contains: input } }],
        },
      });
    }),

  // Create book
  createBook: publicProcedure
    .input(
      z.object({
        title: z.string(),
        author: z.string(),
        genre: z.string(),
        rating: z.number().min(0).max(5),
        coverUrl: z.string().url(),
        description: z.string(),
        totalCopies: z.number().min(1),
        availableCopies: z.number().min(0),
        summary: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await db.book.create({ data: input });
    }),

  // Update book
  updateBook: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        author: z.string().optional(),
        genre: z.string().optional(),
        rating: z.number().min(0).max(5).optional(),
        coverUrl: z.string().url().optional(),
        description: z.string().optional(),
        totalCopies: z.number().min(1).optional(),
        availableCopies: z.number().min(0).optional(),
        summary: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;
      return await db.book.update({ where: { id }, data: updateData });
    }),

  // Delete book
  deleteBook: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await db.book.delete({ where: { id: input } });
  }),
});
