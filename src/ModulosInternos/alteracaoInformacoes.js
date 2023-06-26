import Mesas from '../models/Mesas.js'

const  accessKey = Math.random().toString(36).substring(2,15)

async function alteracaoPedido (req, res) {

	const { Funcao } = req.params
	const info = req.body

	switch(Funcao){
		
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
