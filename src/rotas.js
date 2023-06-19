import { Router } from 'express';
import inserirPedido from './inserirPedido.js'

const rotas = Router();

rotas.post('/inserir', inserirPedido)

export default rotas;
