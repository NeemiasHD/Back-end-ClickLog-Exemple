import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import empresaRoutes from "./routes/empresaRoutes";
import contratoRoutes from "./routes/contratoRoutes";
import notaFiscalRoutes from "./routes/notaFiscalRoutes";

// Inicializa as variáveis de ambiente
dotenv.config();

// Cria uma instância do Express
const app = express();

// Middleware para parsing de JSON e CORS
app.use(express.json());
app.use(cors());

// Rotas básicas de exemplo
app.get("/", (req: Request, res: Response) => {
  res.send("API rodando!");
});
app.use("/", empresaRoutes); // Define um prefixo para as rotas de clientes
app.use("/", contratoRoutes); // Define um prefixo para as rotas de clientes
app.use("/", notaFiscalRoutes); // Define um prefixo para as rotas de clientes
// Importa rotas (de um arquivo de rotas separado, se necessário)
// app.use('/api/rota', rota);

// Configuração da porta
const PORT = process.env.PORT || 3000;

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
