/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
	ApiFromModules,
	FilterApi,
	FunctionReference,
} from "convex/server";
import type * as authors from "../authors.js";
import type * as books from "../books.js";
import type * as categories from "../categories.js";
import type * as files from "../files.js";
import type * as publishers from "../publishers.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
<<<<<<< HEAD
	authors: typeof authors;
	books: typeof books;
	categories: typeof categories;
	files: typeof files;
	http: typeof http;
	publishers: typeof publishers;
=======
  authors: typeof authors;
  books: typeof books;
  categories: typeof categories;
  files: typeof files;
  publishers: typeof publishers;
>>>>>>> main
}>;
export declare const api: FilterApi<
	typeof fullApi,
	FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
	typeof fullApi,
	FunctionReference<any, "internal">
>;
