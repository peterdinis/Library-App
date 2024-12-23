import type { Book, BookUpdates } from "@/types/BookTypes";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

// Create a new book
export const createBook = mutation(async ({ db }, book: Book) => {
	const { id, name, description, image, year, pages, isAvailable, categoryId } =
		book;

	if (!id || !name || !categoryId) {
		throw new Error("Missing required fields: id, name, or categoryId.");
	}

	await db.insert("books", {
		id,
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

// Retrieve a book by ID
export const getBookById = query(
	async ({ db }, { id }: { id: Id<"books"> }) => {
		if (!id) {
			throw new Error("Missing book ID.");
		}

		return await db.get(id);
	},
);

// Update a book by ID
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

// Delete a book by ID
export const deleteBook = mutation(
	async ({ db }, { id }: { id: Id<"books"> }) => {
		if (!id) {
			throw new Error("Missing book ID.");
		}

		await db.delete(id);
		return { message: "Book deleted successfully!" };
	},
);

// Search books by name or description
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
	args: {
		page: v.number(),
		pageSize: v.number(),
	},
	handler: async (ctx, args) => {
		if (args.page < 1) {
			throw new Error("Page must be greater than 0");
		}

		if (args.pageSize < 1) {
			throw new Error("Page size must be greater than 0");
		}

		// Get total count first
		const allBooks = await ctx.db.query("books").collect();

		const totalBooks = allBooks.length;
		const totalPages = Math.ceil(totalBooks / args.pageSize);

		// Get paginated results
		const startIndex = (args.page - 1) * args.pageSize;

		// Ensure the cursor is a string
		const books = await ctx.db
			.query("books")
			.order("desc")
			.paginate({ numItems: args.pageSize, cursor: String(startIndex) });

		return {
			books: books.page,
			totalPages,
			currentPage: args.page,
		};
	},
});
