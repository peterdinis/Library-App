import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { format } from "date-fns";
import { mutation, query } from "./_generated/server";

export const allSelectPublishers = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("publishers").collect();
	},
});

export const uploadPublisherImage = mutation(async (ctx, file) => {
	// Validate the file (optional)
	if (!file || !file.fileName) {
		throw new Error("No file uploaded");
	}

	// Upload the image to Convex storage and get the file ID
	const fileId = await ctx.storage.generateUploadUrl();

	return fileId; // Return the file ID which can be used to store the image URL in your table
});

export const getPaginatedPublishers = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		const publishers = await ctx.db
			.query("publishers")
			.order("desc")
			.paginate(args.paginationOpts);

		return publishers;
	},
});

export const getPublisherById = query(
	async ({ db }, { id }: { id: string }) => {
		if (!id) {
			throw new Error("Missing publisher ID.");
		}

		const publisher = await db
			.query("publishers")
			.filter((q) => q.eq(q.field("_id"), id))
			.first();

		if (!publisher) {
			throw new Error("Publisher not found.");
		}

		return publisher;
	},
);

export const addPublisher = mutation({
	args: {
		name: v.string(),
		description: v.string(),
		image: v.string(),
		city: v.string(),
		isActive: v.boolean(),
		storageId: v.id("_storage"),
	},
	handler: async (ctx, args) => {
		const imageUrl = await ctx.storage.getUrl(args.storageId);

		if (!imageUrl) {
			throw new Error("Failed to get image URL from storage");
		}

		const publisherId = await ctx.db.insert("publishers", {
			name: args.name,
			description: args.description,
			image: imageUrl,
			city: args.city,
			isActive: args.isActive,
			createdDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
		});

		return publisherId;
	},
});

export const updatePublisher = mutation({
	args: {
		id: v.string(),
		name: v.optional(v.string()),
		description: v.optional(v.string()),
		image: v.optional(v.string()),
		city: v.optional(v.string()),
		isActive: v.optional(v.boolean()),
		storageId: v.optional(v.id("_storage")),
	},
	handler: async (ctx, args: {
		id: string;
		name?: string;
		description?: string;
		image?: string;
		city?: string;
		isActive?: boolean;
		storageId?: string;
	}) => {
		const { id, storageId, ...updateData } = args;

		if (!id) {
			throw new Error("Missing publisher ID.");
		}

		// If a new storage ID is provided, fetch the new image URL
		if (storageId) {
			const imageUrl = await ctx.storage.getUrl(storageId);
			if (!imageUrl) {
				throw new Error("Failed to get image URL from storage.");
			}
			updateData.image = imageUrl;
		}

		// Filter out undefined fields
		const filteredUpdateData = Object.fromEntries(
			Object.entries(updateData).filter(([, value]) => value !== undefined)
		);

		// Update the publisher
		const updatedPublisher = await ctx.db.update("publishers", id, filteredUpdateData);

		return updatedPublisher;
	},
});

export const deletePublisher = mutation({
	args: {
		id: v.string(),
	},
	handler: async (ctx, args: { id: string }) => {
		const { id } = args;

		if (!id) {
			throw new Error("Missing publisher ID.");
		}

		// Check if the publisher exists before deletion
		const publisher = await ctx.db
			.query("publishers")
			.filter((q) => q.eq(q.field("_id"), id))
			.first();

		if (!publisher) {
			throw new Error("Publisher not found.");
		}

		// Delete the publisher
		await ctx.db.delete("publishers", id);

		return { success: true, message: "Publisher deleted successfully." };
	},
});