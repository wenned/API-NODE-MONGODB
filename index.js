const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();

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

const date = new Date()

app.use((req, res, next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, PATCH, OPTIONS");
	app.use(cors());
	next();	
})

var hora = String(date.getHours());
var minuto = String(date.getMinutes()).padStart(2,'0');
var segundo = String(date.getSeconds());

app.use(express.json());

app.listen(8080, ()=>{
	console.log('Servidor iniciado na porta 8080')
});

app.get('/', async(req, res)=>{

	try{

		const schemas = await mongoose.connection.db.collection('pedidos').find().toArray();
		
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


	}catch(err){
		console.log('Server error', err)
	}
});

app.put('/input/', async (req, res)=>{
	
	switch(req.body.express){
	
		case 'addnew':

			try{
				CalculoStoque(req.body.Itens)
					.then((ress)=>{
						console.log('valor retornado foi', ress)
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
						}
					})
					
				res.send('PEDIDO ADICIONADO')

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
							
							if(UPDATE_$[i]['Item']['Status'] == 'Feito'){
								cont++
							}
						}
												
						if (cont == UPDATE_$.length){
							const operation = {$set:{Status:"Finalizado"}}
							const filter = {Id:req.body.key}
							mongoose.connection.db.collection('pedidos').updateOne(filter, operation)
						}
					})
				res.send('OK FEITO')

			}catch{err=>{
				console.log('Pedido nao encontrado', err)
			}}

			break

		default:
			//default

	}
});

function calcularValorTotal(args){

	var soma=0;
	for (iten in args){
		soma = soma + args[iten]['Item']['valor']
	};
	return soma.toFixed(2);
}


async function ResultEstoque(key,valor){
	
	try{
		const RESULT = await mongoose.connection.db.collection('Estoque').find().toArray();
	
		for(index in RESULT){
			if(key in RESULT[index]){
	
				re = await mongoose.connection.db.collection('Estoque').findOne({Id:RESULT[index]['Id']})
				if(re[key] >= valor === true){
					return {"tipo":key, "quantidade":true}
				}else{
					return {"tipo":key, "quantidade":false}
				}
			}		
		}

	}catch(err){
		return ('Erro ao processar verificacao de estoque', err)
	}
}

async function CalculoStoque(args){
	
	DICE_$ = []
	for(index in args){
			
			key = args[index]['Item']['tipo']
			Key = args[index]['Item']['quantidade']

			switch(key){

				case 'Carne':
					DICE_$.push(await ResultEstoque(key, Key))
					break
	
				case 'Carne-sol':	
					DICE_$.push(await ResultEstoque(key, Key))
					break

				case 'Queijo':
					DICE_$.push(await ResultEstoque(key, Key))
					break

				case 'Frango':
					DICE_$.push(await ResultEstoque(key, Key))
					break

				case 'Presunto':
					DICE_$.push(await ResultEstoque(key, Key))
					break

				case 'Bacon':
					DICE_$.push(await ResultEstoque(key, Key))
					break

				case 'Cheddar':
					DICE_$.push(await ResultEstoque(key, Key))
					break

				case 'Catupiry':
					DICE_$.push(await ResultEstoque(key, Key))
					break

				case 'Calabresa':
					DICE_$.push(await ResultEstoque(key, Key))
					break

				case 'Salsicha':
					DICE_$.push(await ResultEstoque(key, Key))
					break

				case 'Chocolate':
					DICE_$.push(await ResultEstoque(key, Key))
					break

				case 'Goiabada':
					DICE_$.push(await ResultEstoque(key, Key))
					break

				case 'Banana':
					DICE_$.push(await ResultEstoque(key, Key))
					break

				case 'Canela':
					DICE_$.push(await ResultEstoque(key, Key))
					break

				case 'Palmito':						
					DICE_$.push(await ResultEstoque(key, Key))
					break

				case 'Azeitona':
					DICE_$.push(await ResultEstoque(key, Key))
					break

				default:
					break
		}
	}

	var cont = true
	var returnFalse = []

	for(ind in DICE_$){
		if(DICE_$[ind]['quantidade'] === false ){
			returnFalse.push(DICE_$[ind])
			cont = false
			while(DICE_$.length){DICE_$.pop()}

		}
	}
	console.log(DICE_$.length)
	if(cont === false){
		return returnFalse
		while(returnFalse.length){returnFalse.pop()}

	}else{
		return true
	}

}


async function AlteraStoque(args){
	
	for(index in args){
		key = args[index]['Item']['tipo']
		Key = args[index]['Item']['quantidade']
		
		const RESUL = await mongoose.connection.db.collection('Estoque').find().toArray();
	
		for(index in RESUL){
			if(key in RESUL[index]){
	
				re = await mongoose.connection.db.collection('Estoque').findOne({Id:RESUL[index]['Id']})
				if(re[key] >= Key === true){
					var NEWVALOR = re[key] - Key
					await mongoose.connection.db.collection('Estoque').updateOne({Id:RESUL[index]['Id']},{$set:{[key]:NEWVALOR}})
				}
			}		
		}
	
	}
}

app.post('/inserir',async (req, res)=>{

	switch(req.body.express){

		case 'newrequest':
			
			const dados = []
			var cha;
			Object.keys(req.body).forEach((iten, index)=>{
				
				if(iten == 'express'){
					//
				}else{
					cha = iten
					dados.push({[iten]:req.body[iten]})
				}
			})

			Object.keys(req.body).forEach((iten, index)=>{

				if(iten === iten && iten != 'express'){
					CalculoStoque(req.body[iten]['Itens'])
						.then((ress)=>{

							if(ress == true){
								var keyreturn = 'Y'+String(Math.random()).slice(2,9);
			
								dados.forEach((iten, index)=>{
									for(chav in dados[index]){
										if(chav == cha){
											dados[index][chav]['valor_total'] = calcularValorTotal(dados[index][chav]['Itens']);
											dados[index][chav]['Data'] = date.toLocaleDateString();
											dados[index][chav]['Hora'] = `${hora}:${minuto}:${segundo}`
											dados[index][chav]['Id'] = keyreturn
										}	
									}

								})


								var KEY_FILTER;
								var NPEDIDO;
								async function gravar(){
									AlteraStoque(req.body[iten]['Itens'])

									await mongoose.connection.db.collection('pedidos').insertOne(dados[0][chav])
				
									while(dados.length){
										dados.pop();
										}				
									await mongoose.connection.db.collection('pedidos').findOne({Id:`${keyreturn}`})
									.then(res =>{
										KEY_FILTER = res['_id'];
										}
									)

									r = await mongoose.connection.db.collection('numero_pedido').find().toArray();
									NPEDIDO = r[0]['Nu_pedido']+1
									await mongoose.connection.db.collection('numero_pedido').updateOne({Nu_pedido:r[0]['Nu_pedido']},{$set:{Nu_pedido:NPEDIDO}});
									await mongoose.connection.db.collection('pedidos').updateOne({_id:KEY_FILTER},{$set:{Nu_Pedido:'SM'+NPEDIDO}})

									const OPERATION = {$set:{Id:`${KEY_FILTER.toString()}`}}
									const FILTER = {_id:KEY_FILTER}
									await mongoose.connection.db.collection('pedidos').updateOne(FILTER, OPERATION)
									.then(res=>console.log('Pedido enviado com sucesso'))

								}
							gravar()
								res.send('PEDIDO ENVIADO')
							}else{
								res.send('FALHA AO PRECESSAR PEDIDO')
							}
						})
					}
			});
			break

		default:
			break
	}
	
});
