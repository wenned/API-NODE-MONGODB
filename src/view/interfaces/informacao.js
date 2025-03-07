import ProductInformacao from '../../controllers/getInformacao.js'

async function getInformacao (req, res) {
	
	var dict = new Object();

	dict['metodo'] = req.params.metodo
	dict['numero_pedido'] = req.params.item
	dict['id'] = req.params.id
	
	try{
		const unico = new ProductInformacao(dict)
		
		switch(req.params.metodo){
	
				case 'pedidoUnico':

					const result = await unico.pedidoUnico();
						
					if (result == false){
						res.status(200).json(result)
					}else{
						res.status(201).send(result)
					}
					break
				
				case 'mesas':
					try{
			
						if(typeof dict['numero_pedido'] === 'undefined'){
							const resultMesas = await unico.getMesas();
							res.status(200).send(resultMesas)
						}else{
							const resultadoMesaUnica = await unico.getMesaUnica();
							
							if(resultadoMesaUnica.Estado === 1 && resultadoMesaUnica.Chave === dict.id){
								res.status(200).send(resultadoMesaUnica)
							}else{
							
								if(resultadoMesaUnica.Estado === 1){
									res.status(200).json({"Estado": resultadoMesaUnica.Estado})
								}else{
									res.status(200).send(resultadoMesaUnica)

								}
							}
							
						}

					}catch(err){
						res.status(500).send('Error ao pegar informacao sobre mesas', err)
					};
					break
			
				case 'estoque':
			
					const resultEstoque = await unico.getEstoque();
					res.status(200).send(resultEstoque)
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
						res.status(200).json(resultFeito)
					}else{
						res.status(201).send(resultFeito)
					}
					break
	
				case 'pedidosPendente':
					
					const resultPendente = await unico.getPedidosPendentes();
					if (resultPendente == false){
						res.status(200).json(resultPendente)
					}else{
						res.status(201).send(resultPendente)
					}
					break
	
				case 'caixas':
					
					const caixas = await unico.getCaixas();
					if (caixas == false){
						res.status(200).json(caixas)
					}else{
						res.status(201).send(caixas)
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
