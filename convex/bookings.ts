import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const allSelectBooking = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("bookings").collect();
	},
});

// Mutation to create a new booking
export const createBooking = mutation({
	args: {
		bookName: v.string(),
		from: v.string(),
		to: v.string(),
		userName: v.string(),
		userLastName: v.string(),
		userEmail: v.string(),
		userClass: v.string(),
	},
	handler: async (ctx, args) => {
		const { bookName, from, to, userName, userLastName, userEmail, userClass } = args;
		// Insert the new booking into the database
		const newBooking = await ctx.db.insert("bookings", {
			bookName,
			from,
			to,
			userName,
			userLastName,
			userEmail,
			userClass,
		});
		return newBooking;
	},
});

// Query to get paginated bookings
export const getPaginatedBookings = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		const bookings = await ctx.db
			.query("bookings")
			.order("desc")
			.paginate(args.paginationOpts);
		return bookings;
	},
});