import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import { Rotas } from './routes';


const app = express();
app.use(express.json());
app.use(Rotas);

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


