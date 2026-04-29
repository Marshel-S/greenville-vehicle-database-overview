-- AddForeignKey
ALTER TABLE `vehicle` ADD CONSTRAINT `vehicle_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
