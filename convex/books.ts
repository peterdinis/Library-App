import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

type Book = {
    id: string;
    name: string;
    description: string;
    year: number;
    image: string;
    pages: number;
    isAvailable: boolean;
    categoryId: string;
};

type BookUpdates = Partial<Omit<Book, "id">>; // Allow partial updates, except for the ID

// Create a new book
export const createBook = mutation(async ({ db }, book: Book) => {
    const { id, name, description, image, year, pages, isAvailable, categoryId } = book;

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
export const getBookById = query(async ({ db }, { id }: { id: string }) => {
    if (!id) {
        throw new Error("Missing book ID.");
    }

    return await db.get(new Id("books", id));
});
// Update a book by ID
export const updateBook = mutation(async ({ db }, { id, updates }: { id: string; updates: BookUpdates }) => {
    if (!id || !updates) {
        throw new Error("Missing book ID or updates.");
    }

    const book = await db.get("books", new Id("books", id));
    if (!book) {
        throw new Error("Book not found.");
    }

    await db.patch("books", new Id("books", id), updates);
    return { message: "Book updated successfully!" };
});

// Delete a book by ID
export const deleteBook = mutation(async ({ db }, { id }: { id: string }) => {
    if (!id) {
        throw new Error("Missing book ID.");
    }

    await db.delete("books", new Id("books", id));
    return { message: "Book deleted successfully!" };
});

// Search books by name or description
export const searchBooks = query(async ({ db }, { searchTerm }: { searchTerm: string }) => {
    if (!searchTerm) {
        throw new Error("Missing search term.");
    }

    return await db.query("books")
        .filter((book: Book) =>
            book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .collect();
});

// Get paginated books
export const getPaginatedBooks = query(async ({ db }, { page, pageSize }: { page: number; pageSize: number }) => {
    const skip = (page - 1) * pageSize;

    const books = await db.query("books")
        .skip(skip)
        .take(pageSize)
        .collect();

    const totalBooks = await db.query("books").count();
    const totalPages = Math.ceil(totalBooks / pageSize);

    return {
        books,
        totalPages,
        currentPage: page,
    };
});