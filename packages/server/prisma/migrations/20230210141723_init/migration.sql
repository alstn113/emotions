/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Series` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Series_name_userId_key" ON "Series"("name", "userId");
