import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { authorRouter } from "./routers/author";
import { bookRouter } from "./routers/book";
import { bookingRouter } from "./routers/booking";
import { categoryRouter } from "./routers/category";
import { genreRouter } from "./routers/genre";
import { userRouter } from "./routers/user";
import { adminRouter } from "./routers/admin";
import { workflowRouter } from "./routers/workflow";
import { emailRouter } from "./routers/email";

export const appRouter = createTRPCRouter({
  book: bookRouter,
  workflow: workflowRouter,
  category: categoryRouter,
  author: authorRouter,
  genre: genreRouter,
  user: userRouter,
  booking: bookingRouter,
  admin: adminRouter,
  email: emailRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
