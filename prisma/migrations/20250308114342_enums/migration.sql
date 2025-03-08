/*
  Warnings:

  - The `status` column on the `BorrowRecord` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'STUDENT', 'ADMIN');

-- CreateEnum
CREATE TYPE "BorrowedStatus" AS ENUM ('BORROWED', 'RETURNED', 'NOT_RETURNED');

-- AlterTable
ALTER TABLE "BorrowRecord" DROP COLUMN "status",
ADD COLUMN     "status" "BorrowedStatus" NOT NULL DEFAULT 'BORROWED';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
