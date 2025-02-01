/*
  Warnings:

  - You are about to drop the column `coverColor` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Book` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "coverUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "totalCopies" INTEGER NOT NULL DEFAULT 1,
    "availableCopies" INTEGER NOT NULL DEFAULT 0,
    "summary" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Book" ("author", "availableCopies", "coverUrl", "createdAt", "description", "genre", "id", "rating", "summary", "title", "totalCopies", "updatedAt") SELECT "author", "availableCopies", "coverUrl", "createdAt", "description", "genre", "id", "rating", "summary", "title", "totalCopies", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_id_key" ON "Book"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
