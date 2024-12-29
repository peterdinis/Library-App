import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { parseISO, isBefore } from "date-fns"; 

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
		from: v.string(), // The 'from' date as a string
		to: v.string(),   // The 'to' date as a string
		userName: v.string(),
		userLastName: v.string(),
		userEmail: v.string(),
		userClass: v.string(),
	},
	handler: async (ctx, args) => {
		const { bookName, from, to, userName, userLastName, userEmail, userClass } = args;

		// Parse the 'from' and 'to' date strings using date-fns
		const fromDate = parseISO(from);
		const toDate = parseISO(to);
		const currentDate = new Date(); // Get the current date

		// Check if the 'from' date is before the current date
		if (isBefore(fromDate, currentDate)) {
			throw new Error("The 'from' date cannot be in the past.");
		}

		// Optionally, you can add further validation to check if 'to' is after 'from'
		if (isBefore(toDate, fromDate)) {
			throw new Error("'To' date must be after 'From' date.");
		}

		// Insert the new booking into the database if the dates are valid
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