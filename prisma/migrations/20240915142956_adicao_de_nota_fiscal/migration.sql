-- CreateTable
CREATE TABLE "nota_fiscal" (
    "id" SERIAL NOT NULL,
    "numero_nota" INTEGER NOT NULL,
    "data_de_emissao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_de_vencimento" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "retencao_de_impostos" BOOLEAN NOT NULL DEFAULT false,
    "issqn" DOUBLE PRECISION,
    "irrf" DOUBLE PRECISION,
    "csll" DOUBLE PRECISION,
    "cofins" DOUBLE PRECISION,
    "inss" DOUBLE PRECISION,
    "pis" DOUBLE PRECISION,
    "contrato_id" INTEGER NOT NULL,
    "arquivos_anexados" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "nota_fiscal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "nota_fiscal" ADD CONSTRAINT "nota_fiscal_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "contrato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
