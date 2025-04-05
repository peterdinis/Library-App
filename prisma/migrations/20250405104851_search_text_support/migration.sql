-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "searchIndex" VARCHAR(255) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "searchIndex" VARCHAR(255) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "searchIndex" VARCHAR(255) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Genre" ADD COLUMN     "searchIndex" VARCHAR(255) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "searchIndex" VARCHAR(255) NOT NULL DEFAULT '';
