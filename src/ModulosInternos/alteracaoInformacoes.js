async function insertKey(mesa){
	
	try{
		var okay;
		
		const mesas = await mongoose.connection.db.collection('mesas').find().toArray();
		
		for(var i=0; i < mesas.length; i++){
			Object.keys(mesas[i]).forEach((e)=>{
				if(e === `${mesa}`){
					okay = mesas[i]['Id']
				}
			})
		}
		return okay

	}catch(err){
		console.log('DEU ALGUM ERRO ', err)
	}
};	

const accessKey = Math.random().toString(36).substring(2,15)

async function alteracaoPedido (req, res) {
		
	var DADOS_CALCULO = []
	
	switch(req.params.id){
		
		case 'verificar':
			
			mongoose.connection.db.collection('caixas').updateOne({Id:req.body[1]},{$set:{Verificado:true}})
			mongoose.connection.db.collection('caixas').updateOne({Id:req.body[1]},{$set:{Verificador:req.body[0]}})

			break

		case 'addnew':

			try{

				for(dados in req.body.Itens){
					if(req.body.Itens[dados]['Item']['Status'][1] === "false" ){
						DADOS_CALCULO.push(req.body.Itens[dados])
					}
				}

				if(req.body.Nu_Pedido.length > 2 && req.body.Nu_Pedido != null && req.body.Nu_Pedido != undefined ){

					await CalculoStoque(DADOS_CALCULO)
						.then((ress)=>{
							
							if(ress === true){
								AlteraStoque(req.body.Itens, req.body.Nu_Pedido)
								
								var UPDATE_fild
								UPDATE_fild = req.body.Itens

								const OPERATION = {$set:{Itens:UPDATE_fild}}
								const FILTER = {Id:req.body.Id}
									
								mongoose.connection.db.collection('pedidos').updateOne(FILTER, OPERATION)
					
								var NEWVALUE = calcularValorTotal(req.body.Itens)
								mongoose.connection.db.collection('pedidos').updateOne({Id:req.body.Id},{$set:{valor_total:NEWVALUE}})
								
								while(UPDATE_fild.legth){UPDATE_fild.pop()};
								while(DADOS_CALCULO.length){DADOS_CALCULO.pop()}
								
								if(req.body.Status === 'Finalizado'){
									mongoose.connection.db.collection('pedidos').updateOne({Id:req.body.Id},{$set:{Status:'Pendente'}})
								}
								
								mongoose.connection.db.collection('pedidos').findOne({Nu_Pedido:`${req.body.Nu_Pedido}`})
									.then(doc =>{
	
										var ItensTrue = []
										
										for(item in doc.Itens){
											ItensTrue.push(doc.Itens[item])
										}

										for(g in ItensTrue){
											
											if(ItensTrue[g]['Item']['Status'][1] === "false" ){
												ItensTrue[g]['Item']['Status'][1] = "true"
											}
										}
										mongoose.connection.db.collection('pedidos').updateOne({Id:req.body.Id},{$set:{Itens:ItensTrue}})
									})
							
								res.send(true)

							}else{
								res.json(JSON.stringify(ress))

							}
						})
				}
			}catch{ err =>console.log(err)

			}	
			break

		case 'feito':
			
			var UPDATE_fild;
			var UPDATE_$;

			try{
				await mongoose.connection.db.collection('pedidos').findOne({Nu_Pedido:req.body.codigo})
					.then(res =>{

						UPDATE_fild = res['Itens']
						UPDATE_$ = res['Itens']
						UPDATE_fild[req.params.nu]['Item']['Status'][0]='Feito'

						const OPERATION = {$set:{Itens:UPDATE_fild}}
						const FILTER = {Nu_Pedido:req.body.codigo}
						mongoose.connection.db.collection('pedidos').updateOne(FILTER, OPERATION)
						
						while(UPDATE_fild.legth){UPDATE_fild.pop()};
						
						var cont=0
						
						for (i=0; i<UPDATE_$.length; i++ ){	
							if(UPDATE_$[i]['Item']['Status'][0] == 'Feito'){ cont++ }
						}
												
						if (cont == UPDATE_$.length){
							
							const operation = {$set:{Status:"Finalizado"}}
							const filter = {Nu_Pedido:req.body.codigo}
							mongoose.connection.db.collection('pedidos').updateOne(filter, operation)
						}
					});
				res.send('OK FEITO')

			}catch{err=>{
				res.send('Pedido nao encontrado', err)
			}}

			break
		
		case 'remover':

			var ITENS_UPDATE = []
			var ITENS_PUT = []
			
			try{
				await mongoose.connection.db.collection('pedidos').findOne({Nu_Pedido:req.body[1]})
					.then(res =>{
						
						for(Conte = 0; Conte < res.Itens.length; Conte++){
							if(res.Itens[Conte] === res.Itens[req.body[0]]){
								ITENS_PUT.push(res.Itens[Conte])
							}else{
								ITENS_UPDATE.push(res.Itens[Conte])
							}
						}
					})

				mongoose.connection.db.collection('pedidos').updateOne({Nu_Pedido:req.body[1]},{$set:{Itens:ITENS_UPDATE}})
				var resp = calcularValorTotal(ITENS_UPDATE)
				mongoose.connection.db.collection('pedidos').updateOne({Nu_Pedido:req.body[1]},{$set:{valor_total:resp}})
				AlteraStoque(ITENS_PUT, 1)

			}catch(error){
				console.log('DEU ERRO NA REMOCAO DO ITEM', error)
			}
			
			while(ITENS_UPDATE.legth){ITENS_UPDATE.pop()};
			while(ITENS_PUT.legth){ITENS_PUT.pop()};

			break

		default:
			break
	}
};

export default alteracaoPedido;
