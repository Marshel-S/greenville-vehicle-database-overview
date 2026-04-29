/*
  Warnings:

  - Added the required column `brand` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `brand` VARCHAR(191) NOT NULL;
