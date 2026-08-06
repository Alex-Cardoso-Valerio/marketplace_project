import { Router } from 'express';
import AuthController from './controllers/AuthController';

const rotas = Router();

rotas.post('/cadastro', AuthController.cadastrar);
rotas.post('/login', AuthController.login);

export { Rotas };