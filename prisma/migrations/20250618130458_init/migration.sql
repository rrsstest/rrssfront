/*
  Warnings:

  - A unique constraint covering the columns `[name,projectId]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "EventType" ADD VALUE 'CREATE_PROJECT';

-- DropIndex
DROP INDEX "Role_name_idx";

-- DropIndex
DROP INDEX "Role_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_projectId_key" ON "Role"("name", "projectId");
