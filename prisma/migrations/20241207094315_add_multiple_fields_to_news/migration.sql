/*
  Warnings:

  - You are about to drop the `Ghost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Interaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_ghostId_fkey";

-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_newsId_fkey";

-- DropTable
DROP TABLE "Ghost";

-- DropTable
DROP TABLE "Interaction";

-- DropEnum
DROP TYPE "Action";
