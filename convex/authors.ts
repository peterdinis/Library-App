import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const allAuthorsSelect = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("authors").collect();
	},
});

export const getPaginatedAuthors = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		const authors = await ctx.db
			.query("authors")
			.order("desc")
			.paginate(args.paginationOpts);

		return authors;
	},
});

export const getAuthorById = query(async ({ db }, { id }: { id: string }) => {
	if (!id) {
		throw new Error("Missing author ID.");
	}

	const author = await db
		.query("authors")
		.filter((q) => q.eq(q.field("_id"), id))
		.first();

	if (!author) {
		throw new Error("Author not found.");
	}

	return author;
});

export const createAuthor = mutation({
	args: {
		name: v.string(),
		description: v.string(),
		storageId: v.optional(v.id("_storage")), // Properly typed optional storage ID
		isActive: v.boolean(),
		litPeriod: v.string(),
		bornDate: v.string(),
		deathDate: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		let imageUrl = "";

		if (args.storageId) {
			// Get the URL for the uploaded file using properly typed ID
			const storedImageUrl = await ctx.storage.getUrl(args.storageId);

			if (!storedImageUrl) {
				throw new Error("Failed to get image URL from storage");
			}

			imageUrl = storedImageUrl;
		}

		const authorId = await ctx.db.insert("authors", {
			name: args.name,
			description: args.description,
			image: imageUrl,
			isActive: args.isActive,
			litPeriod: args.litPeriod,
			bornDate: args.bornDate,
			deathDate: args.deathDate,
		});

		return authorId;
	},
});

// Separate mutation for image upload
export const uploadAuthorImage = mutation(async (ctx, file) => {
	if (!file || !file.fileName) {
		throw new Error("No file uploaded");
	}

	// Generate upload URL from Convex storage
	const storageId = await ctx.storage.generateUploadUrl();

	return storageId;
});

export const updateAuthor = mutation({
	args: {
		id: v.string(), // ID of the author to update
		updates: v.object({
			name: v.optional(v.string()),
			description: v.optional(v.string()),
			storageId: v.optional(v.id("_storage")), // Optional image ID for updating the image
			isActive: v.optional(v.boolean()),
			litPeriod: v.optional(v.string()),
			bornDate: v.optional(v.string()),
			deathDate: v.optional(v.string()),
		}),
	},
	handler: async (ctx, { id, updates }) => {
		// Fetch the current author data
		const author = await ctx.db
			.query("authors")
			.filter((q) => q.eq(q.field("_id"), id))
			.first();

		if (!author) {
			throw new Error("Author not found.");
		}

		let imageUrl = author.image;

		// If a new image is uploaded, get the new URL
		if (updates.storageId) {
			const storedImageUrl = await ctx.storage.getUrl(updates.storageId);

			if (!storedImageUrl) {
				throw new Error("Failed to get image URL from storage");
			}

			imageUrl = storedImageUrl;
		}

		const finalUpdates = {
			name: updates.name ?? author.name,
			description: updates.description ?? author.description,
			image: imageUrl,
			isActive: updates.isActive ?? author.isActive,
			litPeriod: updates.litPeriod ?? author.litPeriod,
			bornDate: updates.bornDate ?? author.bornDate,
			deathDate: updates.deathDate ?? author.deathDate,
		};

		await ctx.db.patch(id as unknown as Id<"authors">, finalUpdates);

		return { message: "Author updated successfully!" };
	},
});

export const deleteAuthor = mutation(
	async ({ db }, { id }: { id: Id<"authors"> }) => {
		if (!id) {
			throw new Error("Missing author ID.");
		}

		await db.delete(id);
		return { message: "Author deleted successfully!" };
	},
);
