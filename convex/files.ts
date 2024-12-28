import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
	args: {
		// Add validation for file type and size
		contentType: v.string(),
		maxSize: v.number(),
	},
	handler: async (ctx, args) => {
		// Validate file type
		const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

		if (!allowedTypes.includes(args.contentType)) {
			throw new Error(
				"Unsupported file type. Please upload JPEG, PNG, WebP or GIF.",
			);
		}

		if (args.maxSize > 5 * 1024 * 1024) {
			// 5MB limit
			throw new Error("File size too large. Maximum size is 5MB.");
		}

		return await ctx.storage.generateUploadUrl();
	},
});
