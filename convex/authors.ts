import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const allAuthorsSelect = query({
	args: {},
	handler: async(ctx) => {
		return await ctx.db.query("authors").collect();
	}
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
