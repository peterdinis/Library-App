import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const allSelectBooking = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("bookings").collect();
	},
});

export const createBooking = mutation({});

export const retrieveBooking = mutation({});

export const updateBooking = mutation({});

export const deleteAllBookings = mutation({});

export const allPaginatedBooks = query({});