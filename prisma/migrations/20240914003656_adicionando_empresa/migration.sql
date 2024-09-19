/*
  Warnings:

  - You are about to drop the `custumer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "custumer";

-- CreateTable
CREATE TABLE "empresa" (
    "id" SERIAL NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "razao_social" TEXT NOT NULL,
    "name_fantasia" TEXT NOT NULL,

    CONSTRAINT "empresa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "empresa_cnpj_key" ON "empresa"("cnpj");
