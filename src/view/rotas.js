import { Router } from 'express';
import home from '../view/home.js'
import inserirPedido from './interfaces/inserirPedido.js'
import getInformacao from './interfaces/informacao.js'
import alteracaoPedido from './interfaces/alteracaoInformacoes.js'
import {fecharCaixa, conferirCaixa} from '../controllers/fechamentoCaixa.js'

const rotas = Router();

//Rotas de I/O
rotas.post('/inserir', inserirPedido)
rotas.put('/entrada/:Funcao?', alteracaoPedido)

// Rotas de Fechamento de Caixa
rotas.post('/fechamento_caixa', fecharCaixa) // EM DESENVOLVIMENTO
rotas.put('/fechamento_caixa', conferirCaixa) // EM DESENVOLVIMENTO

// Rotas de Informacoes
rotas.get('/', home)
rotas.get('/:metodo?/:item?/:id?', getInformacao)

export default rotas;
