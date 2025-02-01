import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const categoryRouter = createTRPCRouter({
  // Get all categories
  getAllCategories: publicProcedure.query(async () => {
    return await db.category.findMany();
  }),

  // Get category detail
  getCategoryDetail: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await db.category.findUnique({
      where: { id: input },
    });
  }),

  // Create category
  createCategory: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.category.create({ data: input });
    }),

  // Update category
  updateCategory: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.category.update({ where: { id: input.id }, data: input });
    }),

  // Delete category
  deleteCategory: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await db.category.delete({ where: { id: input } });
  }),
});