import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../prisma';


class AuthController {

    async cadastrar(req: Request, res: Response): Promise<any>{

        try{
            const {Nome, Senha, Email} = req.body;

            if(!Nome || !Senha || !Email){
                return res.status(400).json({ erro: "Todos os campos são obrigatórios!"});
            }
            
            const senhaCriptografada = await bcrypt.hash(Senha, 10);

            const novoUsuario = await prisma.usuario.create({
                data: {
                    Nome,
                    Senha: senhaCriptografada,
                    Email,
                }
            });

            return res.status(201).json({
                mensagem: "Usuario logou com sucesso!",
                usuario: {id: novoUsuario.id, Nome: novoUsuario.Nome}

            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({erro: "Erro interno no servidor."});
        }

    }

    async login(req: Request, res: Response): Promise<any>{

        try {
            const {Nome, Senha, Email} = req.body;

            if (!Nome || !Senha || !Email) {
                return res.status(400).json({erro: "Todos os campos são obrigatórios!"});
            }
            const usuario = await prisma.usuario.findFirst({
                where: { Nome: Nome }
            });

            if (!usuario) {
                return res.status(401).json({ erro: "Usuário não encontrado." });
            }

            const senhaValida = await bcrypt.compare(Senha, usuario.Senha);

            if (!senhaValida) {
                return res.status(401).json({ erro: "Senha incorreta." });
            }

            return res.status(200).json({
                mensagem: "Login realizado com sucesso!",
                usuario: { id: usuario.id, Nome: usuario.Nome}
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro interno de sistema" });
        }
    }
}

export default new AuthController();

