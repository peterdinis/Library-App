import type { Book, BookUpdates } from "@/types/BookTypes";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v7 as uuidv7 } from 'uuid';

export const createBook = mutation(async ({ db }, book: Book) => {
	const { id, name, description, image, year, pages, isAvailable, categoryId } =
		book;

	if (!id || !name || !categoryId) {
		throw new Error("Missing required fields: id, name, or categoryId.");
	}

	await db.insert("books", {
		id: uuidv7(),
		name,
		description,
		image,
		year,
		pages,
		isAvailable,
		categoryId,
	});

	return { message: "Book created successfully!" };
});

export const getBookById = query(async ({ db }, { id }: { id: string }) => {
	if (!id) {
		throw new Error("Missing book ID.");
	}

	const book = await db
		.query("books")
		.filter((q) => q.eq(q.field("id"), id))
		.first();
	if (!book) {
		throw new Error("Book not found.");
	}
	return book;
});

export const updateBook = mutation(
	async (
		{ db },
		{ id, updates }: { id: Id<"books">; updates: BookUpdates },
	) => {
		if (!id || !updates) {
			throw new Error("Missing book ID or updates.");
		}

		const book = await db.get(id);
		if (!book) {
			throw new Error("Book not found.");
		}

		await db.patch(id, updates);
		return { message: "Book updated successfully!" };
	},
);

export const deleteBook = mutation(
	async ({ db }, { id }: { id: Id<"books"> }) => {
		if (!id) {
			throw new Error("Missing book ID.");
		}

		await db.delete(id);
		return { message: "Book deleted successfully!" };
	},
);

export const searchBooks = query({
	args: {
		searchTerm: v.string(),
	},
	handler: async (ctx, args) => {
		if (!args.searchTerm.trim()) {
			throw new Error("Missing search term.");
		}

		return await ctx.db
			.query("books")
			.withSearchIndex("search_idx", (q) => q.search("name", args.searchTerm))
			.collect();
	},
});

export const getPaginatedBooks = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		const books = await ctx.db
			.query("books")
			.order("desc")
			.paginate(args.paginationOpts);

		return books;
	},
});
