/*
  Warnings:

  - You are about to drop the column `description` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "description";
