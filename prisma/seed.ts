import { faker } from "@faker-js/faker";
import { db } from "~/server/db";
import pino from "pino";

const logger = pino({ level: "info" });
const error = pino({ level: "error" });

async function main() {
  logger.info("Seeding database....");

  // Create Genres
  const genres = await Promise.all(
    Array.from({ length: 30 }).map(() =>
      db.genre.create({
        data: {
          name: faker.music.genre(),
        },
      }),
    ),
  );

  // Create Categories
  const categories = await Promise.all(
    Array.from({ length: 30 }).map(() =>
      db.category.create({
        data: {
          name: faker.commerce.department(),
        },
      }),
    ),
  );

  // Create Authors
  const authors = await Promise.all(
    Array.from({ length: 30 }).map(() =>
      db.author.create({
        data: {
          name: faker.person.fullName(),
          bio: faker.lorem.paragraph(),
        },
      }),
    ),
  );

  // Create Books
  await Promise.all(
    Array.from({ length: 10 }).map(() =>
      db.book.create({
        data: {
          title: faker.commerce.productName(),
          rating: faker.number.int({ min: 1, max: 5 }),
          coverUrl: faker.image.urlLoremFlickr({ category: "books" }),
          description: faker.lorem.paragraphs(2),
          totalCopies: faker.number.int({ min: 1, max: 10 }),
          availableCopies: faker.number.int({ min: 0, max: 5 }),
          summary: faker.lorem.sentence(),
          genreId: faker.helpers.arrayElement(genres).id,
          categoryId: faker.helpers.arrayElement(categories).id,
          authorId: faker.helpers.arrayElement(authors).id,
        },
      }),
    ),
  );

  logger.info("Database seeded successfully!");
}

main()
  .catch((e) => {
    error.info("Failed to seed database");
  })
  .finally(async () => {
    await db.$disconnect();
  });
