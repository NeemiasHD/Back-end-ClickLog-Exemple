import express, { Request, Response } from "express";
import {
  getContratosEmpresa,
  getContrato,
  postContrato,
  deleteContrato,
} from "../controllers/contratosController";

const router = express.Router();

router.get("/contrato/:id", getContrato);
router.post("/contrato", postContrato);
router.delete("/contrato/:id", deleteContrato);

router.get("/contratos/:empresaId", getContratosEmpresa);

export default router;
