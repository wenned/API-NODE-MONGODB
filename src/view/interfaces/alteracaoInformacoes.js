import AlteracaoProduct from '../../controllers/alterarProduct.js'
import ProductInformacao from '../../controllers/getInformacao.js'
import CouchdbUtils from '../../controllers/utilsCouchDB.js'

const product = new AlteracaoProduct();
const db = new CouchdbUtils();

async function alteracaoPedido (req, res) {
	
	const r  = req.body	

	switch(req.params.Funcao){
	
		case 'liberaMesa':
		case 'ocuparMesa':
		case 'alteraMesa':
			const libera = await product.setAlterarStatusMesa(r.operacao, r.id)
			
			db.atualizacaoMesas(r.operacao, r.id, libera);

			res.status(201).json(libera)
			break
	
		case 'removerItemPedido':
			
			const getPedido = new ProductInformacao(req.body);
			const result = await getPedido.pedidoUnico();
			
			if(result.Itens[r.index]['Item']['Status'][0] == "Feito"){
				res.status(201).send(false)
			}else{
				
				const remover = await product.removerItemPedido(r.id, r.index);
				db.removerItemPedidoCouchdb(r.id, r.index);
				res.status(201).json(remover)
			}
			break

		case 'pedidoFeito':
			
			const pedido = await product.setPedidoFeito(r.first_id, r.second_id);
			db.marcaPedidoFeitoCouchdb(r.first_id, r.index);
			res.status(201).json(pedido);
			break

		case 'inserirItemPedido':
			const inserir = await product.setInserirItemPedido(r);
			//db.inseirItemPedidoFeitoCouchdb(r)
			res.status(201).json(inserir)
			break

		default:
			break

	}

};

export default alteracaoPedido;
