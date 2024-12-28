import { paginationOptsValidator } from "convex/server";
import type { Category, CategoryUpdates } from "../types/CategoryTypes";
import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const allSelectCategories = query({
	args: {},
	handler: async(ctx) => {
		return await ctx.db.query("categories").collect()
	}
})

export const createCategory = mutation(async ({ db }, category: Category) => {
	const { name, description } = category;

	if (!name || !description) {
		throw new Error("Missing required fields: name, or description.");
	}

	await db.insert("categories", {
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
		{ id, updates }: { id: Id<"categories">; updates: CategoryUpdates },
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
	},
);

export const deleteCategory = mutation(
	async ({ db }, { id }: { id: Id<"categories"> }) => {
		if (!id) {
			throw new Error("Missing category ID.");
		}

		await db.delete(id);
		return { message: "Category deleted successfully!" };
	},
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

	const categoryInfo = await db
		.query("categories")
		.filter((q) => q.eq(q.field("_id"), id))
		.first();
	if (!categoryInfo) {
		throw new Error("Category does not exists.");
	}

	const books = await db
		.query("books")
		.filter((q) => q.eq(q.field("categoryId"), id))
		.collect();

	return {
		categoryInfo,
		books,
	};
});
