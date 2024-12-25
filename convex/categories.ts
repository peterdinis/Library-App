import { paginationOptsValidator } from "convex/server";
import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v7 as uuidv7 } from "uuid";
import { CategoryUpdates } from "@/types/CategoryTypes";

export const createCategory = mutation(async ({ db }, category: any) => {
  const { id, name, description } = category;

  if (!id || !name || !description) {
    throw new Error("Missing required fields: id, name, or description.");
  }

  await db.insert("categories", {
    id: uuidv7(),
    name,
    description,
  });

  return {
    message: "Category was created successfully",
  };
});

export const updateCategory = mutation(
  async (
    { db },
    { id, updates }: { id: Id<"categories">; updates: CategoryUpdates }
  ) => {
    if (!id || !updates) {
      throw new Error("Missing category ID or updates.");
    }

    const category = await db.get(id);
    if (!category) {
      throw new Error("Category not found.");
    }

    await db.patch(id, updates);
    return { message: "Category updated successfully!" };
  }
);

export const deleteCategory = mutation(
  async ({ db }, { id }: { id: Id<"categories"> }) => {
    if (!id) {
      throw new Error("Missing category ID.");
    }

    await db.delete(id);
    return { message: "Category deleted successfully!" };
  }
);

export const getPaginatedCategories = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const categories = await ctx.db
      .query("categories")
      .order("desc")
      .paginate(args.paginationOpts);

    return categories;
  },
});

export const getCategoryById = query(async ({ db }, { id }: { id: string }) => {
  if (!id) {
    throw new Error("Missing categorie ID.");
  }

  const categories = await db
    .query("categories")
    .filter((q) => q.eq(q.field("id"), id))
    .first();
  if (!categories) {
    throw new Error("Categories not found.");
  }
  return categories;
});

export const getBooksByCategoryId = query(
  async ({ db }, { categoryId }: { categoryId: string }) => {
    if (!categoryId) {
      throw new Error("Missing category ID.");
    }

    const books = await db
      .query("books")
      .filter((q) => q.eq(q.field("categoryId"), categoryId))
      .collect();

    return books;
  }
);
