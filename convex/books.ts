import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import type { Id } from "./_generated/dataModel";

// Create book with optional image upload
export const createBook = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    storageId: v.optional(v.id("_storage")),
    year: v.string(),
    publisherId: v.id("publishers"),
    authorId: v.id("authors"),
    pages: v.number(),
    isAvailable: v.boolean(),
    categoryId: v.id("categories"),
  },
  handler: async (ctx, args) => {
    let imageUrl = "";

    if (args.storageId) {
      const storedImageUrl = await ctx.storage.getUrl(args.storageId);
      
      if (!storedImageUrl) {
        throw new Error("Failed to get image URL from storage");
      }
      
      imageUrl = storedImageUrl;
    }

    const bookId = await ctx.db.insert("books", {
      name: args.name,
      description: args.description,
      image: imageUrl,
      year: Number(args.year),
      publisherId: args.publisherId,
      authorId: args.authorId,
      pages: args.pages,
      isAvailable: args.isAvailable,
      categoryId: args.categoryId,
    });

    return { bookId, message: "Book created successfully!" };
  },
});

// Upload book image
export const uploadBookImage = mutation(async (ctx, file) => {
  if (!file || !file.fileName) {
    throw new Error("No file uploaded");
  }

  const storageId = await ctx.storage.generateUploadUrl();
  return storageId;
});

// Get book by ID with related data
export const getBookById = query(async ({ db }, { id }: { id: Id<"books"> }) => {
  if (!id) {
    throw new Error("Missing book ID.");
  }

  const book = await db
    .query("books")
    .filter((q) => q.eq(q.field("_id"), id))
    .first();

  if (!book) {
    throw new Error("Book not found.");
  }

  // Get related category
  const category = await db
    .query("categories")
    .filter((q) => q.eq(q.field("_id"), book.categoryId))
    .first();

  // Get related author
  const author = await db
    .query("authors")
    .filter((q) => q.eq(q.field("_id"), book.authorId))
    .first();

  // Get related publisher
  const publisher = await db
    .query("publishers")
    .filter((q) => q.eq(q.field("_id"), book.publisherId))
    .first();

  return {
    book,
    category,
    author,
    publisher,
  };
});

// Delete book
export const deleteBook = mutation({
  args: { id: v.id("books") },
  handler: async (ctx, args) => {
    const book = await ctx.db.get(args.id);
    if (!book) {
      throw new Error("Book not found.");
    }

    await ctx.db.delete(args.id);
    return { message: "Book deleted successfully!" };
  },
});

// Get paginated books
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