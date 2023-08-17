/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Topic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `groupId` on the `Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Group` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `topicId` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `PostLike` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `postId` on the `PostLike` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Topic` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Topic` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `TopicLike` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `topicId` on the `TopicLike` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_userId_fkey";

-- DropForeignKey
ALTER TABLE "TopicLike" DROP CONSTRAINT "TopicLike_topicId_fkey";

-- DropForeignKey
ALTER TABLE "TopicLike" DROP CONSTRAINT "TopicLike_userId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "groupId",
ADD COLUMN     "groupId" UUID NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Group" DROP CONSTRAINT "Group_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Group_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
DROP COLUMN "topicId",
ADD COLUMN     "topicId" UUID NOT NULL,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PostLike" DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
DROP COLUMN "postId",
ADD COLUMN     "postId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "Topic_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TopicLike" DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
DROP COLUMN "topicId",
ADD COLUMN     "topicId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicLike" ADD CONSTRAINT "TopicLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicLike" ADD CONSTRAINT "TopicLike_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
