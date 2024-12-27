import { paginationOptsValidator } from "convex/server";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { generateUploadUrl } from "./files";

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
	  storageId: v.optional(v.string()), // For uploaded file ID
	  isActive: v.boolean(),
	  litPeriod: v.string(),
	  bornDate: v.string(),
	  deathDate: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
	  let imageUrl = "";
  
	  if (args.storageId) {
		// Get the URL for the uploaded file
		imageUrl = await ctx.storage.getUrl(args.storageId as StorageId);
	  }
  
	  const author = await ctx.db.insert("authors", {
		name: args.name,
		description: args.description,
		image: imageUrl,
		isActive: args.isActive,
		litPeriod: args.litPeriod,
		bornDate: args.bornDate,
		deathDate: args.deathDate,
	  });
  
	  return author;
	},
  });
  
  // Client-side upload function (in your React component)
  export async function uploadAuthorImage(
	file: File,
	generateUploadUrl: any, // Replace with proper type from your generated client
	createAuthor: any // Replace with proper type from your generated client
  ) {
	try {
	  // Step 1: Generate upload URL
	  const uploadUrl = await generateUploadUrl({
		contentType: file.type,
		maxSize: file.size,
	  });
  
	  // Step 2: Upload file to storage
	  const result = await fetch(uploadUrl, {
		method: "POST",
		headers: {
		  "Content-Type": file.type,
		},
		body: file,
	  });
  
	  if (!result.ok) {
		throw new Error("Failed to upload image");
	  }
  
	  // Step 3: Get the storage ID from the response
	  const storageId = await result.text();
  
	  return storageId;
	} catch (error) {
	  console.error("Error uploading file:", error);
	  throw error;
	}
  }