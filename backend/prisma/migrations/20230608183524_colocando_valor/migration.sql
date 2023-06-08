/*
  Warnings:

  - Added the required column `valor` to the `pagamentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pagamentos" ADD COLUMN     "valor" TEXT NOT NULL;
