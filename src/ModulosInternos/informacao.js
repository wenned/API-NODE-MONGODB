
async function getInformacao(req, res){
try{
			
			switch(req.params.id){
				
				case 'caixas':
					
					ITENS_VERIF = []
					
					const Caixas = await mongoose.connection.db.collection(`${req.params.id}`).find().toArray();
					
					for(var ITEMF = 0; ITEMF < Caixas.length; ITEMF++){
						
						if(Caixas[ITEMF]['Verificado'] === false){
							ITENS_VERIF.push(Caixas[ITEMF])
						}
					}
					res.send(ITENS_VERIF)
					break
			
				case 'mesas':
					
					const Mesas = await mongoose.connection.db.collection(`${req.params.id}`).find().toArray();
					res.send(Mesas)
					break

				case 'pedido':
						
					await mongoose.connection.db.collection('pedidos').findOne({Nu_Pedido:`${req.params.pd}`})
						.then(doc => {
							res.send(doc)
						});
					break

				case 'fechamento':

					const peD = await mongoose.connection.db.collection(`pedidos`).find().toArray();
					
					var PEDIDOS_FECHAMENTO = []

					for(var ITEM=0; ITEM < peD.length; ITEM++){
						var keyConfi = peD[ITEM]['Data'].toISOString()
						if(keyConfi.slice(0,10) === req.params.pd && peD[ITEM]['Itens'].length > 0 && peD[ITEM]['Status'] === 'Finalizado'){
							PEDIDOS_FECHAMENTO.push(peD[ITEM])
						}
					}	
					
					res.send(PEDIDOS_FECHAMENTO)
					break

				case 'estoques':
					
					const schemas0 = await mongoose.connection.db.collection(`${req.params.id}`).find().toArray();
					res.send(schemas0)
					break

				case 'pedidos':
		
					const schemas = await mongoose.connection.db.collection(`${req.params.id}`).find().toArray();
		
					var cont = false
					var view =[]
					
					for(iten in schemas){

						if(schemas[iten]['Status'] === 'Pendente'){
							view.push(schemas[iten])
						}
						if(view.length === 1){
							cont = true;
						}
					}

					if(cont){
						res.send(view)
						cont = false
					}else{
						res.send(false)
					}
					break

				case 'menu_bebidas':
					
					const schemas2 = await mongoose.connection.db.collection(`${req.params.id}`).find().toArray();
	
					for(item in Object.values(schemas2)){
						
						var es = Object.values(schemas2)[item]
						var ess = Object.keys(es)
						var forr = ['ja']
						
						for(elemento in forr) {
							
							var t = ess[1].split('-')	
			
							if(ess[1].split('-').length === 1){
								const re = await retornoOne(t)
								if(re === true){
									DADOSRETORNO.push(es)
									//DADOSRETORNO.push(t)
								}					
							}

							if(ess[1].split('-').length === 2){
								const res = await retornoTwo(t)
								if(res === true){
									DADOSRETORNO.push(es)
									//DADOSRETORNO.push(t)
								}					
							}

							if(ess[1].split('-').length === 3){
								const ress = await retornoTwo(t)
								if(ress === true){
									DADOSRETORNO.push(es)
									//DADOSRETORNO.push(t)
								}					
							}
						}	
					}
					
					res.status(200).send(DADOSRETORNO)
					while(DADOSRETORNO.length){DADOSRETORNO.pop()}
					break

				case 'menu_pasteis':

					const schemas3 = await mongoose.connection.db.collection(`${req.params.id}`).find().toArray();
						
					for(item in Object.values(schemas3)){
						
						var es = Object.values(schemas3)[item]
						var ess = Object.keys(es)
						var forr = ['ja']
						
						for(elemento in forr) {
							
							var t = ess[1].split('-')	
								
							if(ess[1].split('-').length === 1){
	
								const re = await retornoOne(t)

								if(re === true){
									DADOSRETORNO.push(es)
									//DADOSRETORNO.push(t)
								}					
							}

							if(ess[1].split('-').length === 2){
								
								const res = await retornoTwo(t)
								
								if(res === true){
									DADOSRETORNO.push(es)
									//DADOSRETORNO.push(t)
								}					
							}

							if(ess[1].split('-').length === 3){
								
								const ress = await retornoTwo(t)
								
								if(ress === true){
									DADOSRETORNO.push(es)
									//DADOSRETORNO.push(t)
								}					
							}
						}	
					}
					
					res.status(200).send(DADOSRETORNO)
					while(DADOSRETORNO.length){DADOSRETORNO.pop()}
					break

				case 'menu_frances':

					const schemas4 = await mongoose.connection.db.collection(`${req.params.id}`).find().toArray();
					
					for(item in Object.values(schemas4)){
						
						var es = Object.values(schemas4)[item]
						var ess = Object.keys(es)
						var forr = ['ja']
						
						for(elemento in forr) {
							
							var t = ess[1].split('-')	
			
							if(ess[1].split('-').length === 1){
								
								const re = await retornoOne(t)
								
								if(re === true){
									DADOSRETORNO.push(es)
									//DADOSRETORNO.push(t)
								}					
							}

							if(ess[1].split('-').length === 2){
								
								const res = await retornoTwo(t)
								
								if(res === true){
									DADOSRETORNO.push(es)
									//DADOSRETORNO.push(t)
								}					
							}

							if(ess[1].split('-').length === 3){
								
								const ress = await retornoTwo(t)
								
								if(ress === true){
									DADOSRETORNO.push(es)
									//DADOSRETORNO.push(t)
								}					
							}
						}	
					}
					
					res.status(200).send(DADOSRETORNO)
					while(DADOSRETORNO.length){DADOSRETORNO.pop()}
					break

				case 'menu_suicos':
					
					const schemas5 = await mongoose.connection.db.collection(`${req.params.id}`).find().toArray();
					
					for(item in Object.values(schemas5)){
						
						var es = Object.values(schemas5)[item]
						var ess = Object.keys(es)
						var forr = ['ja']
						
						for(elemento in forr) {
							
							var t = ess[1].split('-')	
			
							if(ess[1].split('-').length === 1){
								
								const re = await retornoOne(t)
								
								if(re === true){
									DADOSRETORNO.push(es)
									//DADOSRETORNO.push(t)
								}					
							}

							if(ess[1].split('-').length === 2){
								
								const res = await retornoTwo(t)
								
								if(res === true){
									DADOSRETORNO.push(es)
									//DADOSRETORNO.push(t)
								}					
							}

							if(ess[1].split('-').length === 3){
								
								const ress = await retornoTwo(t)
								
								if(ress === true){
									DADOSRETORNO.push(es)
									//DADOSRETORNO.push(t)
								}					
							}	
						}	
					}
					
					res.status(200).send(DADOSRETORNO)
					while(DADOSRETORNO.length){DADOSRETORNO.pop()}
					break

				case 'menu_hamburgues':
					
					const schemas6 = await mongoose.connection.db.collection().find(`${req.params.id}`).toArray();
					break
				
				default:
					break
			}

		}catch(err){
			res.status(500).send('Server error', err)
		};	
};

export default getInformacao;
