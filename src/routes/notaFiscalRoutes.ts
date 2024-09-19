import express, { Request, Response } from "express";
import multer from "multer"; // Importando o multer
import {
  CriarNotaFiscal,
  getNotaFiscal,
} from "../controllers/notafiscalController";

const router = express.Router();

// Configuração do multer
const upload = multer({ dest: "uploads/" }); // Define o diretório de destino para os arquivos

router.get("/NotasFiscais", getNotaFiscal);
router.post("/CriarNotaFiscal", upload.array("arquivos"), CriarNotaFiscal);

export default router;
