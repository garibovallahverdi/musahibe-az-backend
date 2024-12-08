/*
  Warnings:

  - The `like` column on the `News` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dislike` column on the `News` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "News" DROP COLUMN "like",
ADD COLUMN     "like" TEXT[],
DROP COLUMN "dislike",
ADD COLUMN     "dislike" TEXT[];
