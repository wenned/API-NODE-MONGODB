import { Router } from 'express';
import home from './Home/home.js'
import inserirPedido from './ModulosInternos/inserirPedido.js'
import getInformacao from './ModulosInternos/informacao.js'
import entradaSaida from './ModulosInternos/entradaSaida.js'
import alteracaoPedido from './ModulosInternos/alteracaoInformacoes.js'
import {fecharCaixa, conferirCaixa} from './ModulosInternos/fechamentoCaixa.js'

const rotas = Router();

//Rotas de I/O
rotas.post('/inserir', inserirPedido) //FASE TEST
rotas.put('/mesa/:Mesa?/:Id?', entradaSaida) //EM DESENVOLVIMENTO
rotas.put('/entrada/:Funcao?', alteracaoPedido) //FASE DE INTEGRACAO COM FONT-END

// Rotas de Fechamento de Caixa
rotas.post('/fechamento_caixa', fecharCaixa) // EM DESENVOLVIMENTO

// Rotas de Informacoes
rotas.get('/', home) // FASE TESTE
rotas.get('/:Info?', getInformacao) // FASE TESTE

export default rotas;
