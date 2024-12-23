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
	  cursor: v.optional(v.string()), // Optional cursor argument
	},
	handler: async (ctx, args) => {
	  if (args.page < 1) {
		throw new Error("Page must be greater than 0");
	  }
  
	  if (args.pageSize < 1) {
		throw new Error("Page size must be greater than 0");
	  }
  
	  // Get the total number of books (can optimize later with a `count` query)
	  const allBooks = await ctx.db.query("books").collect();
	  const totalBooks = allBooks.length;
	  const totalPages = Math.ceil(totalBooks / args.pageSize);
  
	  // Prepare the query, starting from the beginning or from the cursor
	  let query = ctx.db.query("books").order("desc");
  
	  // If a cursor is provided, use it to filter results (e.g., based on the last book's id)
	 /*  if (args.cursor) {
		query = query.filter({ _id: { $gt: args.cursor } }); // Correct filtering using the _id field
	  } */
  
	  // Perform the paginated query
	  const books = await query.paginate({
		numItems: args.pageSize,
		cursor: args.cursor || null, // Ensure the cursor is passed, even if it's null for the first page
	  });
  
	  // Return the paginated results along with the next cursor (if available)
	  return {
		books: books.page,
		totalPages,
		currentPage: args.page,
		cursor: books.page.length > 0 ? books.page[books.page.length - 1].id : null, // Set the cursor to the last book's id for the next page
	  };
	},
  });
  