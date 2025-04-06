import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const authorRouter = createTRPCRouter({
  getAllAuthors: publicProcedure.query(() => {
    return db.author.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }),

  getAuthorDetail: publicProcedure.input(z.string()).query(({ input }) => {
    return db.author.findUnique({
      where: { id: input },
      select: {
        id: true,
        name: true,
        bio: true,
      },
    });
  }),

  searchAuthors: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
      }),
    )
    .query(({ input }) => {
      const trimmedQuery = input.query.trim();
      if (trimmedQuery.length < 2) return [];

      return db.author.findMany({
        where: {
          name: {
            contains: trimmedQuery,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          name: true,
        },
        take: 10,
        orderBy: {
          name: "asc",
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
    .mutation(({ input }) => {
      return db.author.create({
        data: input,
        select: {
          id: true,
          name: true,
        },
      });
    }),

  updateAuthor: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        bio: z.string().optional(),
      }),
    )
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return db.author.update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
        },
      });
    }),

  deleteAuthor: protectedProcedure.input(z.string()).mutation(({ input }) => {
    return db.author.delete({
      where: { id: input },
      select: {
        id: true,
      },
    });
  }),
});
