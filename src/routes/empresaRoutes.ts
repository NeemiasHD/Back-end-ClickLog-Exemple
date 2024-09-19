import express, { Request, Response } from "express";
import {
  getEmpresas,
  login,
  postEmpresas,
} from "../controllers/empresaController";

const router = express.Router();

router.get("/empresas", getEmpresas);
router.get("/login/:cnpj", login);
router.post("/empresas", postEmpresas);

export default router;
