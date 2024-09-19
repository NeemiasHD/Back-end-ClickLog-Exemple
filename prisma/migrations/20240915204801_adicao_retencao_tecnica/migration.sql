/*
  Warnings:

  - Added the required column `porcentagem_retencao_tecnica` to the `nota_fiscal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "nota_fiscal" ADD COLUMN     "porcentagem_retencao_tecnica" INTEGER NOT NULL,
ADD COLUMN     "retencao_tecnica" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "valor_retencao_tecnica" DOUBLE PRECISION;
