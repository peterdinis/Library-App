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
    const lowercaseInput = input.toLowerCase();
    return await db.book.findMany({
      where: {
        title: {
          contains: lowercaseInput,
        },
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
        genreId: z.string(),
        categoryId: z.string(),
        authorId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await db.book.create({
        data: {
          title: input.title,
          rating: input.rating,
          coverUrl: input.coverUrl,
          description: input.description,
          totalCopies: input.totalCopies,
          availableCopies: input.availableCopies,
          summary: input.summary,
          genre: { connect: { id: input.genreId } },
          category: { connect: { id: input.categoryId } },
          author: { connect: { id: input.authorId } },
        },
      });
    }),

  // Delete book
  deleteBook: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await db.book.delete({ where: { id: input } });
  }),
});
