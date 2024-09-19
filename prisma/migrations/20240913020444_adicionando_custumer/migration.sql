/*
  Warnings:

  - You are about to drop the `neemias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "neemias";

-- CreateTable
CREATE TABLE "custumer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "custumer_pkey" PRIMARY KEY ("id")
);
