/*
  Warnings:

  - You are about to alter the column `Label` on the `Path` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `Label` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `x` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `y` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Path` MODIFY `Label` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `Task` MODIFY `Label` VARCHAR(30) NOT NULL,
    MODIFY `x` DOUBLE NOT NULL,
    MODIFY `y` DOUBLE NOT NULL;
