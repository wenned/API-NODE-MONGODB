import Mesas from '../models/Mesas.js'
import Pedido from '../models/Pedidos.js'

const  accessKey = Math.random().toString(36).substring(2,15)

async function alteracaoPedido (req, res) {

	const { Funcao } = req.params
	const info = req.body

	switch(Funcao){

		case 'pedidoFeito':
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
			break
		
		case 'alterarStatusMesa':
			
			try{
				
				switch(info[0]['Operacao']){

					case 0:
						
						await Mesas.updateOne({'_id':info[0]['Id']},{'Estado':0})
						await Mesas.updateOne({'_id':info[0]['Id']},{'Chave':""})
						res.status(201).send(true)
						break

					case 1:	
						await Mesas.updateOne({'Nome':info[0]['Id']},{'Estado':1})
						await Mesas.updateOne({'Nome':info[0]['Id']},{'Chave': accessKey})
						res.status(201).json(accessKey)	
						break

					case 2:
						
						await Mesas.updateOne({'_id':info[0]['Id']},{'Estado':2})
						await Mesas.updateOne({'_id':info[0]['Id']},{'Chave':""})
						res.status(201).send(true)	
						break

					default:
						break

				}

			}catch(err){
				res.status(500).send('ERRO AO ALTERA STATUS MESA' + err);
			}
			break

		case 'inserirItemPedido':

			try{
				res.status(201).send(true)
			}catch(err){
				res.status(500).send('ERRO AO INSERIR NOVO ITEM AO PEDIDO' + err);
			}		
			break

		case 'alterarItemPedido':
				
			try{
				res.status(201).send(true)
			}catch(err){
				res.status(500).send('ERRO AO ALTERAR ITEM DO PEDIDO' + err);
			}	
			break
		
		case 'removerItemPedido':
			
			try{
				res.status(201).send(true)
			}catch(err){
				res.status(500).send('ERRO AO REMOVER ITEM DO PEDIDO' + err);
			}
			break

		default:
			break
	};
};

export default alteracaoPedido;
