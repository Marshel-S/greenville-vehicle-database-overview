/*
  Warnings:

  - You are about to drop the `car` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `car`;

-- CreateTable
CREATE TABLE `vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `car_name` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `price` INTEGER NULL,
    `topSpeed` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
