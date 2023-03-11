const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();


// models
const Model = require('./models/Estoque')


//Inicinando servidor
mongoose.set('strictQuery', true);

const connect = require('./conectMongo')
connect.on('connected', async ()=>{
	
	try{

		console.log('Conectando ao Servidor!')
		//mongoose.connection.close();
	}catch(err){
		console.log(err)
	}
})

app.use((req, res, next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, PATCH, OPTIONS");
	app.use(cors());
	next();	
})

app.use(express.json());

app.listen(8080, ()=>{
	console.log('Servidor iniciado na porta 8080')
});

async function retornoOne(a){
	
	var res = await mongoose.connection.db.collection('estoques').findOne({[a]:{$gt:0}})
	if(res === null){
	}else{
		return true
	}
};

async function retornoTwo(b){

	var cont=0;
	for(item in b){
		var res = await mongoose.connection.db.collection('estoques').findOne({[b[item]]:{$gt:0}})
		if(res === null){
			cont++
		}
	}
	if(cont === 0){return true}
};

app.get('/:id?', async(req, res)=>{
	
	const Valida = req.params.id || false
	if(Valida === false){
		res.send(`=====================================
				<h1>'API SABOR MINEIRO'</h1>
			=====================================`)
	}else{

		try{

			switch(req.params.id){

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
						res.send('AGUARDNANDO NOVOS PEDIDOS')
					}
				
					break

				case 'menu_bebidas':
					const schemas2 = await mongoose.connection.db.collection(`${req.params.id}`).find().toArray();
					res.send(schemas2)
					break

				case 'menu_pasteis':
					const schemas3 = await mongoose.connection.db.collection(`${req.params.id}`).find().toArray();

					var DADOSRETORNO=[]

					for(item in Object.values(schemas3)){
						var es = Object.values(schemas3)[item]
						var ess = Object.keys(es)
						var forr = ['ja']
						for(elemento in forr) {
							var t = ess[1].split('-')	
			
							if(ess[1].split('-').length === 1){
								const re = await retornoOne(t)
								if(re === true){
									//DADOSRETORNO.push(es['_id'])
									DADOSRETORNO.push(t)
								}					
							}

							if(ess[1].split('-').length === 2){
								const res = await retornoTwo(t)
								if(res === true){
									//DADOSRETORNO.push(es['_id'])
									DADOSRETORNO.push(t)
								}					
							}

							if(ess[1].split('-').length === 3){
								const ress = await retornoTwo(t)
								if(ress === true){
									//DADOSRETORNO.push(es['_id'])
									DADOSRETORNO.push(t)
								}					
							}
	
						}	
					}
					
					res.status(200).send(DADOSRETORNO)
					break

				case 'menu_frances':
					const schemas4 = await mongoose.connection.db.collection(`${req.params.id}`).find().toArray();
					res.send(schemas4)
					break

				case 'menu_suicos':
					const schemas5 = await mongoose.connection.db.collection(`${req.params.id}`).find().toArray();
					res.send(schemas5)
					break

				case 'menu_hamburgues':
					const schemas6 = await mongoose.connection.db.collection().find(`${req.params.id}`).toArray();
					break
				
				default:
					break

			}

		}catch(err){
			res.send('Server error', err)
		}
	}
});

app.put('/input/', async (req, res)=>{
	
	switch(req.body.express){
	
		case 'addnew':

			try{
				CalculoStoque(req.body.Itens)
					.then((ress)=>{

						if(ress === true){
							AlteraStoque(req.body.Itens)

							var UPDATE_fild;

							mongoose.connection.db.collection('pedidos').findOne({Id:req.body.key})
								.then(res =>{
					
							UPDATE_fild = res['Itens']
			
							for(var i=0; i<req.body.Itens.length; i++){
								UPDATE_fild.push(req.body.Itens[i])
							}

							const OPERATION = {$set:{Itens:UPDATE_fild}}
							const FILTER = {Id:req.body.key}
							mongoose.connection.db.collection('pedidos').updateOne(FILTER, OPERATION)
						
							var NEWVALUE = calcularValorTotal(UPDATE_fild)
							mongoose.connection.db.collection('pedidos').updateOne({Id:req.body.key},{$set:{valor_total:NEWVALUE}})

							while(UPDATE_fild.legth){UPDATE_fild.pop()};
						
							if(res['Status'] == 'Finalizado'){
								mongoose.connection.db.collection('pedidos').updateOne({Id:req.body.key},{$set:{Status:'Pendente'}})
								}						
							});
						}else{
							res.send('PEIDO NAO PODE SER PROCESSADOR')
						}
						res.send('PEDIDO ADICIONADO')
					})

			}catch(err){
				res.send('PEDIDO NAO PODE SER PROCESSADO',erro)
			}
			
			break

		case 'pagar':
			break

		case 'feito':
			
			var UPDATE_fild;
			var UPDATE_$;

			try{
				await mongoose.connection.db.collection('pedidos').findOne({Id:req.body.key})
					.then(res =>{
						UPDATE_fild = res['Itens']
						UPDATE_$ = res['Itens']
						UPDATE_fild[req.body.id]['Item']['Status']='Feito'
						const OPERATION = {$set:{Itens:UPDATE_fild}}
						const FILTER = {Id:req.body.key}
						mongoose.connection.db.collection('pedidos').updateOne(FILTER, OPERATION)
						while(UPDATE_fild.legth){UPDATE_fild.pop()};
						
						var cont=0
						
						for (i=0; i<UPDATE_$.length; i++ ){	
							if(UPDATE_$[i]['Item']['Status'] == 'Feito'){ cont++ }
						}
												
						if (cont == UPDATE_$.length){
							const operation = {$set:{Status:"Finalizado"}}
							const filter = {Id:req.body.key}
							mongoose.connection.db.collection('pedidos').updateOne(filter, operation)
						}
					});
				res.send('OK FEITO')

			}catch{err=>{
				res.send('Pedido nao encontrado', err)
			}}

			break

		default:
			break
	}
});

function calcularValorTotal(args){

	var soma=0;
	for (iten in args){
		soma = soma + (args[iten]['Item']['Quantidade'] * args[iten]['Item']['Valor'])
	};
	return soma.toFixed(2);
};


async function ResultEstoque(key,valor){
		
	try{
		const RESULT = await mongoose.connection.db.collection('estoques').find().toArray();
	
		for(index in RESULT){
			if(key in RESULT[index]){
	
				re = await mongoose.connection.db.collection('estoques').findOne({Id:RESULT[index]['Id']})
				if(re[key] >= valor === true){
					return {"Sabor":key, "Quantidade":true}
				}else{
					return {"Sabor":key, "Quantidade":false}
				}
			}		
		};

	}catch(err){
		return ('Erro ao processar verificacao de estoque', err)
	}
};

async function CalculoStoque(args){
	
	DICE_$ = []
	for(index in args){

			Key = args[index]['Item']['Quantidade']
			var looP = args[index]['Item']['Sabor']
			
			for(item in looP){
	
				switch(looP[item]){

					case 'Carne':
						DICE_$.push(await ResultEstoque(looP[item], Key))
						break
	
					case 'Carne-sol':	
						DICE_$.push(await ResultEstoque(looP[item], Key))
						break

					case 'Queijo':
						DICE_$.push(await ResultEstoque(looP[item], Key))
						break

					case 'Frango':
						DICE_$.push(await ResultEstoque(looP[item], Key))
						break

					case 'Presunto':
						DICE_$.push(await ResultEstoque(looP[item], Key))
						break

					case 'Bacon':
						DICE_$.push(await ResultEstoque(looP[item], Key))
						break

					case 'Cheddar':
						DICE_$.push(await ResultEstoque(looP[item], Key))
						break

					case 'Catupiry':
						DICE_$.push(await ResultEstoque(looP[item], Key))
						break

					case 'Calabresa':
						DICE_$.push(await ResultEstoque(looP[item], Key))
						break

					case 'Salsicha':
						DICE_$.push(await ResultEstoque(looP[item], Key))
						break

					case 'Chocolate':
						DICE_$.push(await ResultEstoque(looP[item], Key))
						break

					case 'Goiabada':
						DICE_$.push(await ResultEstoque(looP[item], Key))
						break

					case 'Banana':
						DICE_$.push(await ResultEstoque(looP[item], Key))
						break

					case 'Canela':
						DICE_$.push(await ResultEstoque(looP[item], Key))
						break

					case 'Palmito':						
						DICE_$.push(await ResultEstoque(looP[item], Key))
						break

					case 'Azeitona':
						DICE_$.push(await ResultEstoque(looP[item], Key))
						break

					default:
						break
			}
		}
	}

	var cont = true
	var returnFalse = []	
	
	for(ind in DICE_$){
		if(DICE_$[ind]['Quantidade'] === false ){
			returnFalse.push(DICE_$[ind])
			cont = false
		}
	}

	if(cont === false){
		return returnFalse
		while(DICE_$.length){DICE_$.pop()}
		while(returnFalse.length){returnFalse.pop()}

	}else{
		return true
	}

}


async function AlteraStoque(args){
	
	const RESUL = await mongoose.connection.db.collection('estoques').find().toArray();

	for(index in args){
		
		Key = args[index]['Item']['Quantidade']
		var Segloop = args[index]['Item']['Sabor']
		
		for (iteM in Segloop){
			var VerifC = Segloop[iteM]
	
			for(index in RESUL){
				if( Segloop[iteM] in RESUL[index]){
	
					re = await mongoose.connection.db.collection('estoques').findOne({Id:RESUL[index]['Id']})
					if(re[VerifC] >= Key === true){
						var NEWVALOR = re[VerifC] - Key
						await mongoose.connection.db.collection('estoques').updateOne({Id:RESUL[index]['Id']},{$set:{[VerifC]:NEWVALOR}})
					}
				}		
			};
		};
	};
};


app.post('/inserir',async (req, res)=>{

	if(Object.keys(req.body).length === 0){
		//
	}else{
		var dados = []
		dados.push(req.body)
		var keyreturn = 'Y'+String(Math.random()).slice(2,9);
	
		for(iten in dados){
			dados[iten]['Id'] = keyreturn	
			r = dados[iten]['valor_total'] = calcularValorTotal(dados[iten]['Itens']);
		
		}
	
		await CalculoStoque(req.body.Itens)
		.then((ress)=>{
			if(ress == true){
			
				var KEY_FILTER;
				var NPEDIDO;

				AlteraStoque(req.body.Itens)
				mongoose.connection.db.collection('pedidos').insertOne(dados[iten])
				
				while(dados.length){ dados.pop();}

				async function gravar(){
					await mongoose.connection.db.collection('pedidos').findOne({Id:`${keyreturn}`})
					.then(res =>{
						KEY_FILTER = res['_id'];
						})

					await mongoose.connection.db.collection('numero_pedido').find().toArray()
					.then(ress =>{
						NPEDIDO = ress[0]['Nu_pedido']+1

					mongoose.connection.db.collection('numero_pedido').updateOne({Nu_pedido:ress[0]['Nu_pedido']},{$set:{Nu_pedido:NPEDIDO}});
					mongoose.connection.db.collection('pedidos').updateOne({_id:KEY_FILTER},{$set:{Nu_Pedido:'SM'+NPEDIDO}})
					mongoose.connection.db.collection('pedidos').updateOne({_id:KEY_FILTER},{$set:{Data:new Date()}})
				
					OPERATION = {$set:{Id:`${KEY_FILTER.toString()}`}}
					const FILTER = {_id:KEY_FILTER}
									
					mongoose.connection.db.collection('pedidos').updateOne(FILTER, OPERATION)
						.then(res=>console.log('Pedido enviado com sucesso'))

					res.send(true)
					});
				}
				gravar()
			
			}else{
				console.log('FALHA AO PRECESSAR PEDIDO')
				res.send(ress)
			}
		});
	
		}

});
