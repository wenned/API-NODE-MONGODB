import Mesas from '../models/Mesas.js'
import Pedido from '../models/Pedidos.js'
import {AlteraStoque, retornaEstoque} from './alterarEstoque.js'
import {calcularValorTotal, CalculoStoque} from './verificarEstoque.js'
import makeid from './geradorId.js'

class AlteracaoProduct {
	
	async setPedidoFeito (){
		var cont=0;
		const infoId = req.body.idPrincipal; // ID do documento principal
		const itemId = req.body.idItem; // ID do elemento em Itens que será atualizado

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
		res.status(201).send(result)
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
						
						if(valid[0]['Estado'] === 1){
							return 1	
						}
						
						if(valid[0]['Estado'] === 2){
							return 2
						}
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

	async setInserirItemPedido(){
		try{
			const ItensCal = []
			const valorTotal = await calcularValorTotal(info.Itens);
					
			for(var index=0; index < info.Itens.length; index++){
				if(info.Itens[index]['Item']['Status'][1] === "false"){
					ItensCal.push(info.Itens[index])
				}
			}	
			
			const retorno = await CalculoStoque(ItensCal)

			if(retorno === true){
				await Pedido.updateOne({_id:info.Id},{'valor_total':valorTotal}) 
				await AlteraStoque(ItensCal)
					
				for(var iNdex=0; iNdex < ItensCal.length; iNdex++){
					ItensCal[iNdex]['Item']['Status'][1] =  "true"
				}
			
				for(var Index=0; Index < ItensCal.length; Index++){
					await Pedido.updateOne({_id:info.Id},{$push:{Itens:ItensCal[Index]}})
				}
				await Pedido.updateOne({_id:info.Id},{'Status':"Pendente"})
			}			
			res.status(201).send(ItensCal)
		}catch(err){
			res.status(500).send('ERRO AO INSERIR NOVO ITEM AO PEDIDO' + err);
		};
	};

	async removerItemPedido(){
		try{
			const ItensCalc = []

			const getPedidO = await Pedido.findById(info.Id)				
			ItensCalc.push(getPedidO.Itens[info.Index])
			await  retornaEstoque(ItensCalc)
			await Pedido.updateMany({_id: info.Id}, { $pull: { Itens: { _id: ItensCalc[0]['_id'] } } });
				
			const getPedid = await Pedido.findById(info.Id)
			const valorTotal = await calcularValorTotal(getPedid.Itens);
			await Pedido.updateOne({_id:info.Id},{'valor_total':valorTotal}) 
				
			const removerPedido = await Pedido.findById(info.Id)

			if(removerPedido.valor_total === 0){
				await Pedido.deleteOne({_id:info.Id},{})
			};

			res.status(201).send(true)
		}catch(err){
			res.status(500).send('ERRO AO REMOVER ITEM DO PEDIDO' + err);
		}
	};
};

export default AlteracaoProduct;