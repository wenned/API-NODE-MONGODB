const accessKey = Math.random().toString(36).substring(2,15)

async function alteracaoPedido (req, res) {

	const {Funcao, Chave} = req.params
	const info = req.body

	switch(Funcao){
		
		case 'alterarStatusMesa':
			
			try{
				res.status(201).send(true)
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
