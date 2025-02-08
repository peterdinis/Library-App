import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { authorRouter } from "./routers/author";
import { bookRouter } from "./routers/book";
import { categoryRouter } from "./routers/category";
import { genreRouter } from "./routers/genre";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	book: bookRouter,
	category: categoryRouter,
	author: authorRouter,
	genre: genreRouter,
	user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
