import Mesas from '../models/Mesas.js'
import Pedido from '../models/Pedidos.js'
import {AlteraStoque, retornaEstoque} from './alterarEstoque.js'
import {calcularValorTotal, CalculoStoque} from './verificarEstoque.js'
import makeid from './geradorId.js'

class AlteracaoProduct {
	
	async setInserirItemPedido(args){	

		try{
			const pedido = await Pedido.findById(args.first_id)
			const pedidoAlterado = pedido
			
			args.item.forEach((e, x)=>{
				console.log(args.item[x])
				pedidoAlterado.Itens.push(args.item[x])
			});
		
			const ItensCal = []
			const valorTotal = await calcularValorTotal(pedidoAlterado.Itens);
					
			for(var index=0; index < pedidoAlterado.Itens.length; index++){
				if(pedidoAlterado.Itens[index]['Item']['Status'][1] === "false"){
					ItensCal.push(pedidoAlterado.Itens[index])
				}
			}	

			const retorno = await CalculoStoque(ItensCal)

			if(retorno === true){
				await Pedido.updateOne({_id:args.first_id},{'valor_total':valorTotal}) 
				await AlteraStoque(ItensCal)
					
				for(var iNdex=0; iNdex < ItensCal.length; iNdex++){
					ItensCal[iNdex]['Item']['Status'][1] =  "true"
				}
			
				for(var Index=0; Index < ItensCal.length; Index++){
					await Pedido.updateOne({_id:args.first_id},{$push:{Itens:ItensCal[Index]}})
				}
				await Pedido.updateOne({_id:args.first_id},{'Status':"Pendente"})
			}			
			return ItensCal;
		}catch(err){
			return 'ERRO AO INSERIR NOVO ITEM AO PEDIDO' + err;
		};
	};
		
	async setPedidoFeito (fid, sid){
		var cont=0;
		const infoId = fid; // ID do documento principal
		const itemId = sid; // ID do elemento em Itens que será atualizado
			
		const result = await Pedido.updateOne(
			{ _id: infoId, 'Itens._id': itemId }, // Condição para encontrar o documento e o elemento específico
			{ $set: { 'Itens.$.Item.Status': ['Feito', 'true'] } } // Atualização do campo Status
		);
			
		const getPedido = await Pedido.findById(infoId)

		for(var index=0; index < getPedido.Itens.length; index++){
			if(getPedido.Itens[index]['Item']['Status'][0] === "Feito"){
				cont++
			};
		};

		if(getPedido.Itens.length === cont){
			await Pedido.updateOne({_id:infoId},{Status:"Finalizado"})
		}
		return result
	};

	async setAlterarStatusMesa(operacao, id){

		try{
			switch(operacao){

					case 0:
						await Mesas.updateOne({'_id':id},{'Estado':0})
						await Mesas.updateOne({'_id':id},{'Chave':""})
						return 0;
						break

					case 1:	
						const accessKey = makeid(11)
						const valid = await Mesas.find({'Nome': id})
						
						if(valid[0]['Estado'] === 0){
							await Mesas.updateOne({'Nome':id},{'Estado':1})
							await Mesas.updateOne({'Nome':id},{'Chave': accessKey})
							return accessKey	
						}					
						
						if(valid[0]['Estado'] === 1){ return 1 }
						
						if(valid[0]['Estado'] === 2){ return 2 }

						break

				case 2:	
						await Mesas.updateOne({'_id':id},{'Estado':2})
						await Mesas.updateOne({'_id':id},{'Chave':2})
						return 2
						break

					default:
						break
				};

		}catch(err){
			return 'ERRO AO ALTERA STATUS MESA' + err;
		};
	};

	async removerItemPedido(id, index){
		
		var validacao = 0;

		try{
			const ItensCalc = []

			const getPedido = await Pedido.findById(id)				
			
			ItensCalc.push(getPedido.Itens[index])
			await  retornaEstoque(ItensCalc)
			await Pedido.updateMany({_id: id}, { $pull: { Itens: { _id: ItensCalc[0]['_id'] } } });
				
			const getPedid = await Pedido.findById(id)
			const valorTotal = await calcularValorTotal(getPedid.Itens);
			await Pedido.updateOne({_id:id},{'valor_total':valorTotal}) 
				
			const removerPedido = await Pedido.findById(id)

			if(removerPedido.valor_total === 0){
				await Pedido.deleteOne({_id:id},{})
				var retorno = {"Pedido": id}
				return retorno
			};

			const verificarFeitos = await Pedido.findById(id)
			
			for( var x = 0; x < verificarFeitos.Itens.length; x++ ){
				if(verificarFeitos.Itens[x]['Item']['Status'][0] == "Feito"){
					validacao++			
				}
			}

			if(verificarFeitos.Itens.length === validacao){
				await Pedido.updateOne({_id:id},{'Status':'Finalizado'})
			}

			return true
		}catch(err){
			return 'ERRO AO REMOVER ITEM DO PEDIDO ' + err;
		}
	};
};

export default AlteracaoProduct;
