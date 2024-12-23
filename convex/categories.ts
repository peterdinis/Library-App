import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v7 as uuidv7 } from 'uuid';

export const createCategory = mutation(async({db}, category: any) => {
    const {id, name, description} = category;

    if (!id || !name || !description) {
		throw new Error("Missing required fields: id, name, or description.");
	}

    await db.insert("categories", {
        id: uuidv7(),
        name,
        description
    })

    return {
        message: "Category was created successfully"
    }
})