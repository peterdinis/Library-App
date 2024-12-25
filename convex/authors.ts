import { paginationOptsValidator } from "convex/server";
import { query } from "./_generated/server";

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
