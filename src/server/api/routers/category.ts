import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const categoryRouter = createTRPCRouter({
  getAllCategories: publicProcedure.query(async () => {
    return await db.category.findMany();
  }),

  getCategoryDetail: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.category.findUnique({
        where: { id: input },
      });
    }),

  createCategory: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await db.category.create({ data: input });
    }),

  updateCategory: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await db.category.update({ where: { id: input.id }, data: input });
    }),

  deleteCategory: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await db.category.delete({ where: { id: input } });
    }),
});
