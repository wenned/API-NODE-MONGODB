import ProductInformacao from '../../controllers/getInformacao.js'

async function getInformacao (req, res) {
	
	try{
		const unico = new ProductInformacao(req.params.Mesa)	
		
		switch(req.params.Info){
				
				case 'pedidoUnico':

					const result = await unico.pedidoUnico();
						
					if (result == false){
						res.status(500).json(result)
					}else{
						res.status(201).send(result)
					}
					break
				
				case 'mesas':

					const resultMesas = await unico.getMesas();
					res.send(resultMesas)
					break
			
				case 'estoque':
			
					const resultEstoque = await unico.getEstoque();
					res.send(resultEstoque)
					break
				
				case 'menu_bebidas':

					const resultDrinks = await unico.getBebidas();
					res.status(200).send(resultDrinks)
					break

				case 'menu_pasteis':
					
					const resultPasteis = await unico.getPasteis();
					res.status(200).send(resultPasteis)
					break

				case 'menu_frances':
					
					const resultFrances = await unico.getFrances();
					res.status(200).send(resultFrances)
					break

				case 'menu_suicos':
					
					const resultSuico = await unico.getSuicos();
					res.status(200).send(resultSuico)
					break

				case 'menu_hamburg': //EM DESEMVOLVIMENTO
					
					const resultHamburg = await unico.getHamburg();
					res.status(200).send(resultHamburg)
					break
	
				case 'pedidosFeito':
					const resultFeito = await unico.getPedidosFeitos();
					if (resultFeito == false){
						res.status(500).json(resultFeito)
					}else{
						res.status(201).send(resultFeito)
					}
					break

				case 'pedidosPendente':
					const resultPendente = await unico.getPedidosPendentes();
					if (resultPendente == false){
						res.status(500).json(resultPendente)
					}else{
						res.status(201).send(resultPendente)
					}
					break
						
				default:
					break
			}

		}catch(err){
			res.status(500).send('Server error', err)
		};	
};

export default getInformacao;
