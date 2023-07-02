import { Router } from 'express';
import home from './Home/home.js'
import inserirPedido from './ModulosInternos/inserirPedido.js'
import getInformacao from './ModulosInternos/informacao.js'
import alteracaoPedido from './ModulosInternos/alteracaoInformacoes.js'
import {fecharCaixa, conferirCaixa} from './ModulosInternos/fechamentoCaixa.js'

const rotas = Router();

//Rotas de I/O
rotas.post('/inserir', inserirPedido) //FASE REMOCAO ADICIONAL
rotas.put('/entrada/:Funcao?', alteracaoPedido)

// Rotas de Fechamento de Caixa
rotas.post('/fechamento_caixa', fecharCaixa) // EM DESENVOLVIMENTO
rotas.put('/fechamento_caixa', conferirCaixa) // EM DESENVOLVIMENTO

// Rotas de Informacoes
rotas.get('/', home)
rotas.get('/:Info?/:Mesa?', getInformacao)

export default rotas;
