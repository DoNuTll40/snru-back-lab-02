/*
  Warnings:

  - You are about to drop the column `duedate` on the `todo` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `todo` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `todo` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `todo_duedate` to the `todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `todo_title` to the `todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `todo_updated_at` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `todo` DROP FOREIGN KEY `Todo_user_id_fkey`;

-- AlterTable
ALTER TABLE `todo` DROP COLUMN `duedate`,
    DROP COLUMN `status`,
    DROP COLUMN `title`,
    ADD COLUMN `todo_created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `todo_duedate` DATE NOT NULL,
    ADD COLUMN `todo_status` ENUM('PANDING', 'DOING', 'DONE') NOT NULL DEFAULT 'PANDING',
    ADD COLUMN `todo_title` VARCHAR(150) NOT NULL,
    ADD COLUMN `todo_updated_at` TIMESTAMP(0) NOT NULL;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_username` VARCHAR(30) NOT NULL,
    `user_password` VARCHAR(72) NOT NULL,
    `user_email` VARCHAR(191) NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `todo` ADD CONSTRAINT `todo_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
