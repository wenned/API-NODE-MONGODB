import Pedido from '../models/Pedidos.js'
import nuPedido from '../models/nuPedido.js'
import {AlteraStoque} from './alterarEstoque.js'
import {calcularValorTotal, CalculoStoque, ResultEstoque} from './verificarEstoque.js'
import CouchdbUtils  from './utilsCouchDB.js'	


class Product {
	
	constructor(args){
		this.dados = args;
		this.db = new CouchdbUtils();
	};

	async inserirProduct(){
		var unitProduct = this.dados
		
		try{
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
	
				const response_pedido = await Pedido.create(unitProduct)
				
				this.db.alterarNumeroPedidoCouchDB(newPedido);
				this.db.inserirPedidoCouchDb(response_pedido, unitProduct);
				
				return response_pedido
			};
		}catch{error}{
			console.error('Erro interno Servidor', error)
		
		}
	};
};

export default Product;
