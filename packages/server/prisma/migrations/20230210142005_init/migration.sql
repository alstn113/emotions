/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Series` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Series_name_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Series_id_userId_key" ON "Series"("id", "userId");
