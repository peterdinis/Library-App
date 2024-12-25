import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	books: defineTable({
		id: v.string(),
		name: v.string(),
		description: v.string(),
		image: v.string(),
		year: v.number(),
		pages: v.number(),
		isAvailable: v.boolean(),
		categoryId: v.string(),
		authorId: v.string()
	}).searchIndex("search_idx", {
		searchField: "name",
	}),

	categories: defineTable({
		id: v.string(),
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
});
