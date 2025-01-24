import AlteracaoProduct from '../../controllers/alterarProduct.js'
import ProductInformacao from '../../controllers/getInformacao.js'

const product = new AlteracaoProduct();

async function alteracaoPedido (req, res) {
	
	const r  = req.body	
	switch(req.params.Funcao){
	
		case 'liberaMesa':
		case 'ocuparMesa':
		case 'alteraMesa':
			const libera = await product.setAlterarStatusMesa(r.operacao, r.id)
			res.status(201).json(libera)
			break
	
		case 'removerItemPedido':
			
			const getPedido = new ProductInformacao(req.body);
			const result = await getPedido.pedidoUnico();
			if(result.Itens[r.index]['Item']['Status'][0] == "Feito"){
				res.status(201).send(false)
			}else{
	
				const remover = await product.removerItemPedido(r.id, r.index);
				res.status(201).json(remover)
			}
			break

		case 'pedidoFeito':
			const pedido = await product.setPedidoFeito(r.first_id, r.second_id);
			res.status(201).json(pedido);
			break

		case 'inserirItemPedido':
			const inserir = await product.setInserirItemPedido(r);
			res.status(201).json(inserir)
			break

		default:
			break

	}

};

export default alteracaoPedido;
