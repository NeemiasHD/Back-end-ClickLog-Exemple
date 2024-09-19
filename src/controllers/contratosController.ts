import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getContrato = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const contratos = await prisma.contrato.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(contratos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const deleteContrato = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const contratoDeletado = await prisma.contrato.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(201).json(contratoDeletado);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postContrato = async (req: Request, res: Response) => {
  try {
    const { nome_do_contrato, codigo_contrato, retencao_tecnica, empresaId } =
      req.body;
    if (
      !nome_do_contrato ||
      !codigo_contrato ||
      !retencao_tecnica ||
      !empresaId
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
    }
    const novoContrato = await prisma.contrato.create({
      data: {
        nome_do_contrato,
        codigo_contrato,
        retencao_tecnica,
        empresaId,
      },
    });
    res.status(201).json(novoContrato);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar contrato" });
  }
};

export const getContratosEmpresa = async (req: Request, res: Response) => {
  const { empresaId } = req.params;

  try {
    const contratos = await prisma.contrato.findMany({
      where: {
        empresaId: Number(empresaId),
      },
    });
    if (contratos.length > 0) {
      res.json(contratos);
    } else {
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
