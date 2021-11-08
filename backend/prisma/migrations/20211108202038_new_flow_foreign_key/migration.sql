/*
  Warnings:

  - Added the required column `flowId` to the `Path` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Path` ADD COLUMN `flowId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Path` ADD CONSTRAINT `Path_flowId_fkey` FOREIGN KEY (`flowId`) REFERENCES `Flow`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
