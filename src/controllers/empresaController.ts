import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEmpresas = async (req: Request, res: Response) => {
  try {
    const empresa = await prisma.empresa.findMany();
    res.json(empresa);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postEmpresas = async (req: Request, res: Response) => {
  try {
    const { cnpj, razao_social, name_fantasia } = req.body;

    // Verifica se todos os campos estão presentes
    if (!cnpj || !razao_social || !name_fantasia) {
      return res
        .status(400)
        .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    // Cria a nova empresa
    const novaEmpresa = await prisma.empresa.create({
      data: {
        cnpj,
        razao_social,
        name_fantasia,
      },
    });

    // Envia a resposta de sucesso ao cliente
    res.status(201).json(novaEmpresa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar empresa." });
  }
};

//Busca cnpj e retorna o mesmo
export const login = async (req: Request, res: Response) => {
  const { cnpj } = req.params;

  try {
    const empresa = await prisma.empresa.findUnique({
      where: {
        cnpj: cnpj,
      },
    });

    if (!empresa) {
      return res.status(404).json({ message: "CNPJ não encontrado." });
    }
    res.json(empresa);
  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).json({ error: "Erro no servidor." });
  }
};
