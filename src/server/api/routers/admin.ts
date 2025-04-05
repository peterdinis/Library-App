import { Author, Book, Booking, Category, Genre, User } from "@prisma/client";
import { z } from "zod";
import { esClient } from "~/lib/elasticsearch";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type ElasticsearchHit<T> = {
  _id: string;
  _source: T;
};

export const adminRouter = createTRPCRouter({
  searchAll: publicProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ input }) => {
      const { query } = input;

      const [userRes, bookRes, authorRes, bookingRes, genreRes, categoryRes] = await Promise.all([
        esClient.search({
          index: "users",
          query: {
            multi_match: {
              query,
              fields: ["fullName", "email", "role", "status"],
            },
          },
        }),
        esClient.search({
          index: "books",
          query: {
            multi_match: {
              query,
              fields: ["title", "description", "summary", "rating"],
            },
          },
        }),
        esClient.search({
          index: "authors",
          query: {
            multi_match: {
              query,
              fields: ["name", "bio"],
            },
          },
        }),
        esClient.search({
          index: "bookings",
          query: {
            multi_match: {
              query,
              fields: ["className", "status"],
            },
          },
        }),
        esClient.search({
          index: "genres",
          query: {
            multi_match: {
              query,
              fields: ["name"],
            },
          },
        }),
        esClient.search({
          index: "categories",
          query: {
            multi_match: {
              query,
              fields: ["name"],
            },
          },
        }),
      ]);

      return {
        users: (userRes.hits.hits as ElasticsearchHit<User>[]).map(hit => ({ id: hit._id, ...hit._source })),
        books: (bookRes.hits.hits as ElasticsearchHit<Book>[]).map(hit => ({ id: hit._id, ...hit._source })),
        authors: (authorRes.hits.hits as ElasticsearchHit<Author>[]).map(hit => ({ id: hit._id, ...hit._source })),
        bookings: (bookingRes.hits.hits as ElasticsearchHit<Booking>[]).map(hit => ({ id: hit._id, ...hit._source })),
        genres: (genreRes.hits.hits as ElasticsearchHit<Genre>[]).map(hit => ({ id: hit._id, ...hit._source })),
        categories: (categoryRes.hits.hits as ElasticsearchHit<Category>[]).map(hit => ({ id: hit._id, ...hit._source })),
      };
    }),
});
