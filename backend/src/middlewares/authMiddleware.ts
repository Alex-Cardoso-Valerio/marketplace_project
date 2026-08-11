import type {Request, Response, NextFunction} from 'express';
import  jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): any {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ erro: "acesso negado, token não fornecido!"});
    }

    const [, token] = authorization.split(" ");

    try {
        const segredo = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, segredo);

        const { id } = decoded as TokenPayload;

        (req as any).usuarioId = id;

        return next();

    } catch (error) {
        return res.status(401).json({ erro: "Token inválido ou expirado!" });
    }

}             

