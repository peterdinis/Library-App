import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const categoryRouter = createTRPCRouter({
  getAllCategories: publicProcedure.query(() =>
    db.category.findMany({
      select: {
        id: true,
        name: true,
      },
    })
  ),

  getCategoryDetail: publicProcedure
    .input(z.string())
    .query(({ input }) =>
      db.category.findUnique({
        where: { id: input },
        select: {
          id: true,
          name: true,
        },
      })
    ),

  searchCategories: publicProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(({ input }) =>
      db.category.findMany({
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

  createCategory: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => db.category.create({ data: input })),

  updateCategory: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return db.category.update({
        where: { id },
        data,
      });
    }),

  deleteCategory: protectedProcedure
    .input(z.string())
    .mutation(({ input }) =>
      db.category.delete({ where: { id: input } })
    ),
});
