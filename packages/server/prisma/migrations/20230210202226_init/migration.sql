/*
  Warnings:

  - You are about to drop the column `posts_count` on the `Series` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Series" DROP COLUMN "posts_count",
ADD COLUMN     "postsCount" INTEGER NOT NULL DEFAULT 0;
