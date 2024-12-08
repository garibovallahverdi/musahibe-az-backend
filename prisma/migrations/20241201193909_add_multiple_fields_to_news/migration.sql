-- AlterTable
ALTER TABLE "News" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'main',
ADD COLUMN     "tags" TEXT[];
