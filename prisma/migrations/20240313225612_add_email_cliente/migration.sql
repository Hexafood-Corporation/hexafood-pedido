/*
  Warnings:

  - Added the required column `email` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "email" TEXT NOT NULL;
