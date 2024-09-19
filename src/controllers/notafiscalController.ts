import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

// Configuração do multer para salvar os arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "/temp");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export const getNotaFiscal = async (req: Request, res: Response) => {
  try {
    const nota_fiscal = await prisma.nota_fiscal.findMany();
    res.json(nota_fiscal);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const CriarNotaFiscal = async (req: Request, res: Response) => {
  try {
    const {
      numero_nota,
      data_de_emissao,
      data_de_vencimento,
      valor,
      retencao_de_impostos,
      issqn,
      irrf,
      csll,
      cofins,
      inss,
      pis,
      contrato_id,
      retencao_tecnica,
      valor_retencao_tecnica,
      porcentagem_retencao_tecnica,
    } = JSON.parse(req.body.dados);
    const arquivos = req.files as Express.Multer.File[];
    const caminhosArquivos = arquivos.map((file) => file.path);

    // Verifica se o contrato existe antes de criar a nota fiscal
    const contrato = await prisma.contrato.findUnique({
      where: { id: contrato_id },
    });

    if (!contrato) {
      return res.status(404).json({ message: "Contrato não encontrado" });
    }

    // Cria a nova nota fiscal
    const notaFiscal = await prisma.nota_fiscal.create({
      data: {
        numero_nota,
        data_de_emissao: new Date(data_de_emissao),
        data_de_vencimento: new Date(data_de_vencimento),
        valor,
        retencao_de_impostos,
        issqn,
        irrf,
        csll,
        cofins,
        inss,
        pis,
        contrato_id,
        arquivos_anexados: caminhosArquivos,
        retencao_tecnica,
        valor_retencao_tecnica,
        porcentagem_retencao_tecnica,
      },
    });

    return res.status(201).json({
      message: "Nota fiscal criada com sucesso",
      notaFiscal,
    });
  } catch (error) {
    console.error("Erro ao criar a nota fiscal:", error);
    return res.status(500).json({ error: "Erro ao criar a nota fiscal" });
  }
};
