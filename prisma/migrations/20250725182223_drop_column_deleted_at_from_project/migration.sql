/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "deleted_at";
