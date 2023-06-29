/*
  Warnings:

  - You are about to drop the column `votes` on the `Topic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "votes",
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_slug_key" ON "Topic"("slug");
