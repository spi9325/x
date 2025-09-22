/*
  Warnings:

  - Added the required column `bio` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "profile" TEXT;
