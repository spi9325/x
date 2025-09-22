/*
  Warnings:

  - Added the required column `emailVerified` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "emailVerified" BOOLEAN NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
