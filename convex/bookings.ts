import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { isBefore, parseISO } from "date-fns";
import { mutation, query } from "./_generated/server";

export const allSelectBooking = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("bookings").collect();
	},
});

export const getBookingsByEmail = query({
	args: {
		userEmail: v.string(), // The email to filter bookings by
	},
	handler: async (ctx, args) => {
		const { userEmail } = args;

		// Query the bookings table for records where userEmail matches
		const bookings = await ctx.db
			.query("bookings")
			.filter((q) => q.eq(q.field("userEmail"), userEmail))
			.collect();

		return bookings;
	},
});

// Mutation to create a new booking
export const createBooking = mutation({
	args: {
		bookName: v.string(),
		from: v.string(), // The 'from' date as a string
		to: v.string(), // The 'to' date as a string
		userName: v.string(),
		userLastName: v.string(),
		userEmail: v.string(),
		userClass: v.string(),
	},
	handler: async (ctx, args) => {
		const { bookName, from, to, userName, userLastName, userEmail, userClass } =
			args;

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

		// Find the book by name
		const book = await ctx.db
			.query("books")
			.filter((q) => q.eq(q.field("name"), bookName))
			.first();

		if (!book) {
			throw new Error("Book not found.");
		}

		await ctx.db.patch(book._id, {
			isAvailable: false,
		});

		return newBooking;
	},
});

export const returnBook = mutation({
	args: {
		bookingId: v.string(), // The booking ID to find the booking
	},
	handler: async (ctx, args) => {
		const { bookingId } = args;

		// Find the booking by ID
		const booking = await ctx.db.query("bookings").filter((q) => q.eq(q.field("_id"), bookingId)).first();

		if (!booking) {
			throw new Error("Booking not found.");
		}

		// Find the book by the booking's bookName
		const book = await ctx.db
			.query("books")
			.filter((q) => q.eq(q.field("name"), booking.bookName))
			.first();

		if (!book) {
			throw new Error("Book not found.");
		}

		// Update the availability of the book to 'true' (indicating it's returned)
		await ctx.db.patch(book._id, {
			isAvailable: true,
		});

		return { message: "Book returned successfully." };
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
