import 'dotenv/config';
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Configuração do Banco de Dados
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(express.json());

// Rota de teste
app.get('/', (req: Request, res: Response) => {
  return res.json({ 
    status: "Sucesso", 
    mensagem: "Backend limpo e rodando perfeitamente!" 
  });
});

const PORTA = 3333;
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});