import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
    books: defineTable({}),

    categories: defineTable({}),

    authors: defineTable({}),

    publishers: defineTable({})
});