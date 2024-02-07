import Pedido from '../models/Pedidos.js'
import nuPedido from '../models/nuPedido.js'
import {AlteraStoque} from './alterarEstoque.js'
import {calcularValorTotal, CalculoStoque, ResultEstoque} from './verificarEstoque.js'

class Product {
	
	constructor(args){
		this.dados = args;
	};
	
	async inserirProduct(){
		var unitProduct = this.dados[0]
	
		const valorTotal = await calcularValorTotal(unitProduct.Itens);
		unitProduct.valor_total = Number(valorTotal)
		const retorno = await CalculoStoque(unitProduct.Itens)
		
		if(retorno === true){
			
			await AlteraStoque(unitProduct.Itens)

			for(var index=0; index < unitProduct.Itens.length; index++){
				unitProduct.Itens[index]['Item']['Status'][1] =  "true"
			}
			
			const NuPedido = await nuPedido.findById('63fa6fe096ec286fca8578a5')
			
			unitProduct.Nu_Pedido =	'SM' + (NuPedido.Nu_pedido + 1)
			const newPedido = NuPedido.Nu_pedido + 1
			await nuPedido.updateOne({'_id':'63fa6fe096ec286fca8578a5'},{'Nu_pedido':newPedido})
	
			const Gravar = await Pedido.create(unitProduct)
			return Gravar
			};
		};
};

export default Product;
