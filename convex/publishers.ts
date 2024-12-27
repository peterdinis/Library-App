import { paginationOptsValidator } from "convex/server";
import { query } from "./_generated/server";

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
