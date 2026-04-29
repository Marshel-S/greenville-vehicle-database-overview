/*
  Warnings:

  - Added the required column `topSpeed` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `car` ADD COLUMN `topSpeed` INTEGER NOT NULL;
