import { faker } from "@faker-js/faker";
import { db } from "~/server/db";
import pino from "pino";

const logger = pino({ level: "info" });
const error = pino({ level: "error" });

async function createUniqueGenres(count: number) {
  const genreSet = new Set<string>();
  while (genreSet.size < count) {
    genreSet.add(faker.music.genre());
  }

  const genres = await Promise.all(
    Array.from(genreSet).map((name) =>
      db.genre.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  return genres;
}

async function createUniqueCategories(count: number) {
  const categorySet = new Set<string>();
  while (categorySet.size < count) {
    categorySet.add(faker.commerce.department());
  }

  const categories = await Promise.all(
    Array.from(categorySet).map((name) =>
      db.category.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  return categories;
}

async function main() {
  logger.info("Seeding database...");

  try {
    // Optional: clear existing data (useful for development only)
    await db.book.deleteMany();
    await db.author.deleteMany();
    await db.genre.deleteMany();
    await db.category.deleteMany();

    const genres = await createUniqueGenres(30);
    const categories = await createUniqueCategories(30);

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
  } catch (e) {
    error.error({ msg: "Seeding failed", error: e });
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

main();
