-- CreateTable
CREATE TABLE "contrato" (
    "id" SERIAL NOT NULL,
    "nome_do_contrato" TEXT NOT NULL,
    "codigo_contrato" INTEGER NOT NULL,
    "retencao_tecnica" DOUBLE PRECISION NOT NULL,
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "contrato_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contrato" ADD CONSTRAINT "contrato_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
