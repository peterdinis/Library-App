import { paginationOptsValidator } from "convex/server";
import type {Book, BookUpdates} from "../types/BookTypes"
import { v7 as uuidv7 } from "uuid";
import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const createBook = mutation(async ({ db }, book: Book) => {
	const {
		name,
		description,
		image,
		year,
		publisherId,
		authorId,
		pages,
		isAvailable,
		categoryId,
	} = book;

	if (!name || !categoryId) {
		throw new Error("Missing required fields: id, name, or categoryId.");
	}

	await db.insert("books", {
		name,
		description,
		image,
		authorId,
		year,
		pages,
		isAvailable,
		categoryId,
		publisherId,
	});

	return { message: "Book created successfully!" };
});

export const getBookById = query(async ({ db }, { id }: { id: string }) => {
	if (!id) {
		throw new Error("Missing book ID.");
	}

	const book = await db
		.query("books")
		.filter((q) => q.eq(q.field("_id"), id))
		.first();

	const category = await db
		.query("categories")
		.filter((q) => q.eq(q.field("_id"), book?.categoryId))
		.first();

	if (!book) {
		throw new Error("Book not found.");
	}
	return {
		book,
		category,
	};
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