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
        isAvaiable: v.boolean(),
        authorName: v.string(),
        publisherName: v.string()
    }),

    categories: defineTable({
        id: v.string(),
        name: v.string(),
        description: v.string()
    }),

    authors: defineTable({}),

    publishers: defineTable({})
});