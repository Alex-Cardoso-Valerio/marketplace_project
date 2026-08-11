import { Router } from "express";
import type { Request, Response } from "express";
import  AuthController  from "./controllers/AuthController";
import { authMiddleware } from "./middlewares/authMiddleware";
 
const rotas = Router();

rotas.post("/cadastro", AuthController.cadastrar);
rotas.post("/login", AuthController.login);

rotas.get("/perfil", authMiddleware, (req: Request, res: Response) => {
  const idDoUsuarioLogado = (req as any).usuarioId;

  return res.json({
    mensagem: "Você entrou na area VIP!",
    seuId: idDoUsuarioLogado,
  });
});

export { rotas as Rotas };
