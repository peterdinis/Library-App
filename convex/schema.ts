import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	books: defineTable({
		name: v.string(),
		description: v.string(),
		image: v.string(),
		year: v.number(),
		pages: v.number(),
		isAvailable: v.boolean(),
		categoryId: v.string(),
		authorId: v.string(),
		publisherId: v.string(),
	}).searchIndex("search_idx", {
		searchField: "name",
	}),

	categories: defineTable({
		name: v.string(),
		description: v.string(),
	}).searchIndex("search_idx", {
		searchField: "name",
	}),

	authors: defineTable({
		name: v.string(),
		description: v.string(),
		image: v.string(),
		isActive: v.boolean(),
		litPeriod: v.string(),
		bornDate: v.string(),
		deathDate: v.optional(v.string()),
	}).searchIndex("search_idx", {
		searchField: "name",
	}),

	publishers: defineTable({
		name: v.string(),
		description: v.string(),
		image: v.string(),
		city: v.string(),
		isActive: v.boolean(),
		createdDate: v.string(),
	}).searchIndex("search_idx", {
		searchField: "name",
	}),

	users: defineTable({
		email: v.string(),
		imageUrl: v.string(),
		clerkId: v.string(),
		name: v.string(),
	}),

	bookings: defineTable({
		bookName: v.string(),
		from: v.string(),
		to: v.string(),
		userName: v.string(),
		userLastName: v.string(),
		userEmail: v.string(),
		userClass: v.string(),
	}),
});
