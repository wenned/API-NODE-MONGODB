import Pedido from '../models/Pedidos.js'
import nuPedido from '../models/nuPedido.js'
import {AlteraStoque} from './alterarEstoque.js'
import {calcularValorTotal, CalculoStoque, ResultEstoque} from './verificarEstoque.js'

async function inserirPedido(req, res){
	
	var dados = []
	
	if(Object.keys(req.body).length === 0){
		//
	}else{
		
		dados.push(req.body)
		
		const valorTotal = await calcularValorTotal(req.body.Itens);
		
		dados[0]['valor_total'] = Number(valorTotal)

		const retorno = await CalculoStoque(req.body.Itens)
		
		if(retorno === true){
			
			await AlteraStoque(req.body.Itens)

			for(var index=0; index < req.body.Itens.length; index++){
				dados[0]['Itens'][index]['Item']['Status'][1] =  "true"
			}
			
			const NuPedido = await nuPedido.findById('63fa6fe096ec286fca8578a5')
		
			dados[0]['Nu_Pedido'] =	'SM' + (NuPedido.Nu_pedido + 1)
			
			const newPedido = NuPedido.Nu_pedido + 1
			await nuPedido.updateOne({'_id':'63fa6fe096ec286fca8578a5'},{'Nu_pedido':newPedido})
	
			const Gravar = await Pedido.create(dados[0])

			res.status(201).json(Gravar)
		};
	};
};

export default inserirPedido;
