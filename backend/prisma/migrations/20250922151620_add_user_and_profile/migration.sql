/*
  Warnings:

  - Added the required column `userProfile` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Comment" ADD COLUMN     "userProfile" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
