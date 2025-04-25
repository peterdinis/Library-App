import { faker } from "@faker-js/faker";
import { db } from "~/server/db";
import pino from "pino";

const logger = pino({ level: "info" });
const errorLogger = pino({ level: "error" });

const NUM_GENRES = 30;
const NUM_CATEGORIES = 30;
const NUM_AUTHORS = 30;
const NUM_BOOKS = 100;

async function createUniqueGenres(count: number) {
  const genreSet = new Set<string>();
  while (genreSet.size < count) {
    genreSet.add(faker.music.genre());
  }

  const genres = await Promise.all(
    [...genreSet].map((name) =>
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
    [...categorySet].map((name) =>
      db.category.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  return categories;
}

async function createAuthors(count: number) {
  return await Promise.all(
    Array.from({ length: count }).map(() =>
      db.author.create({
        data: {
          name: faker.person.fullName(),
          bio: faker.lorem.paragraph(),
        },
      }),
    ),
  );
}

async function createBooks(count: number, genres: any[], categories: any[], authors: any[]) {
  return await Promise.all(
    Array.from({ length: count }).map(() =>
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
}

async function main() {
  logger.info("🌱 Starting database seeding...");

  try {
    // Clear existing data
    logger.info("🧹 Clearing existing data...");
    await db.book.deleteMany();
    await db.author.deleteMany();
    await db.genre.deleteMany();
    await db.category.deleteMany();

    logger.info("🎭 Creating genres...");
    const genres = await createUniqueGenres(NUM_GENRES);

    logger.info("🏷️ Creating categories...");
    const categories = await createUniqueCategories(NUM_CATEGORIES);

    logger.info("✍️ Creating authors...");
    const authors = await createAuthors(NUM_AUTHORS);

    logger.info("📚 Creating books...");
    await createBooks(NUM_BOOKS, genres, categories, authors);

    logger.info("✅ Database seeded successfully!");
  } catch (e) {
    errorLogger.error({ msg: "❌ Seeding failed", error: e });
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

main();
