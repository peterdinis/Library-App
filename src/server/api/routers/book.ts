import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import ratelimit from "~/lib/upstash/ratelimit";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const bookRouter = createTRPCRouter({
  getAllBooks: protectedProcedure.query(() => {
    return db.book.findMany({
      select: {
        id: true,
        title: true,
        rating: true,
        coverUrl: true,
      },
      orderBy: { title: "asc" },
    });
  }),

  getBookDetail: publicProcedure.input(z.string()).query(({ input }) => {
    return db.book.findUnique({
      where: { id: input },
      select: {
        id: true,
        title: true,
        rating: true,
        coverUrl: true,
        description: true,
        totalCopies: true,
        availableCopies: true,
        isAvaible: true,
        summary: true,
        author: {
          select: { id: true, name: true },
        },
        genre: {
          select: { id: true, name: true },
        },
        category: {
          select: { id: true, name: true },
        },
      },
    });
  }),

  quickSearchBook: publicProcedure.input(z.string()).query(({ input }) => {
    return db.book.findMany({
      where: {
        title: {
          contains: input.trim(),
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        title: true,
        coverUrl: true,
        isAvaible: true,
      },
      orderBy: { title: "asc" },
      take: 10,
    });
  }),

  getPaginatedBooks: publicProcedure
    .input(
      z.object({
        page: z.number().min(1),
        pageSize: z.number().min(1).max(100),
        categoryId: z.string().optional(),
        genreId: z.string().optional(),
        authorId: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { page, pageSize, categoryId, genreId, authorId } = input;
      const skip = (page - 1) * pageSize;

      const filters = {
        ...(categoryId && { categoryId }),
        ...(genreId && { genreId }),
        ...(authorId && { authorId }),
      };

      const [books, totalBooks] = await Promise.all([
        db.book.findMany({
          where: filters,
          skip,
          take: pageSize,
          orderBy: { title: "asc" },
          select: {
            id: true,
            title: true,
            isAvaible: true,
            rating: true,
            coverUrl: true,
          },
        }),
        db.book.count({ where: filters }),
      ]);

      return {
        books,
        totalBooks,
        totalPages: Math.ceil(totalBooks / pageSize),
        currentPage: page,
      };
    }),

  createBook: protectedProcedure
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
      const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
      const { success } = await ratelimit.limit(ip);

      if (!success) return redirect("/too-fast");

      return db.book.create({
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
        select: {
          id: true,
          title: true,
        },
      });
    }),

  updateBook: protectedProcedure
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
        genreId: z.string().optional(),
        categoryId: z.string().optional(),
        authorId: z.string().optional(),
      }),
    )
    .mutation(({ input }) => {
      const { id, genreId, categoryId, authorId, ...rest } = input;
      const updateData: any = {
        ...Object.fromEntries(
          Object.entries(rest).filter(([_, v]) => v !== undefined),
        ),
      };

      if (genreId) updateData.genre = { connect: { id: genreId } };
      if (categoryId) updateData.category = { connect: { id: categoryId } };
      if (authorId) updateData.author = { connect: { id: authorId } };

      return db.book.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          title: true,
        },
      });
    }),

  deleteBook: protectedProcedure.input(z.string()).mutation(({ input }) => {
    return db.book.delete({
      where: { id: input },
      select: {
        id: true,
      },
    });
  }),
});
