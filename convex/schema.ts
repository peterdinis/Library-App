import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

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
    }).searchIndex("search_idx", {
        searchField: "name",
    }),

    categories: defineTable({
        id: v.string(),
        name: v.string(),
        description: v.string(),
    }),

    authors: defineTable({}),

    publishers: defineTable({})
});