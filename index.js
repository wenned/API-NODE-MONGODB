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
	
		//const schemas = await mongoose.connection.db.listCollections().toArray();
		//schemas.forEach(schma=>console.log(schma.name))

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

const dados = []

app.listen(8080, ()=>{
	console.log('Servidor iniciado na porta 8080')
});

app.get('/', (req, res)=>{
	res.json(dados)
});

app.put('/input/', async (req, res)=>{
	
	switch(req.body.express){
	
		case 'addnew':

				var UPDATE_fild;

				await mongoose.connection.db.collection('pedidos').findOne({Idtmp:req.body.key})
					.then(res =>{
						
						UPDATE_fild = res['Itens']
						var valor = {"Item":""}
						valor['Item'] = req.body.Item
						UPDATE_fild.push(valor)

						const OPERATION = {$set:{Itens:UPDATE_fild}}
						const FILTER = {Idtmp:req.body.key}
						mongoose.connection.db.collection('pedidos').updateOne(FILTER, OPERATION)
						while(UPDATE_fild.legth){UPDATE_fild.pop()};
						
						if(res['Status'] == 'Finalizado'){
								mongoose.connection.db.collection('pedidos').updateOne({Idtmp:req.body.key},{$set:{Status:'Pendente'}})
						}

						var NEWVALUE = calcularValorTotal(UPDATE_fild)
						mongoose.connection.db.collection('pedidos').updateOne({Idtmp:req.body.key},{$set:{valor_total:NEWVALUE}})

					});
			res.send(UPDATE_fild)
				
			break

		case 'pagar':
			break

		case 'feito':
			
			var UPDATE_fild;
			var UPDATE_$;

			try{
				await mongoose.connection.db.collection('pedidos').findOne({Idtmp:req.body.key})
					.then(res =>{
						
						UPDATE_fild = res['Itens']
						UPDATE_$ = res['Itens']
						UPDATE_fild[req.body.id]['Item']['Status']='Feito'

						const OPERATION = {$set:{Itens:UPDATE_fild}}
						const FILTER = {Idtmp:req.body.key}
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
							const filter = {Idtmp:req.body.key}
							mongoose.connection.db.collection('pedidos').updateOne(filter, operation)

						}
	
					}).catch(err=>console.log(err))
					res.send('Ok')
			}catch{err=>{
				console.log('Pedido nao encontrado', erro)
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


app.post('/inserir',(req, res)=>{

	switch(req.body.express){

		case 'newrequest':
			var cha;
			Object.keys(req.body).forEach((iten, index)=>{
				if(iten == 'express'){
					//
				}else{
					cha = iten
					dados.push({[iten]:req.body[iten]})
					res.send('Pedido adicionado com sucesso')
				}
			})
			
			var keyreturn = 'Y'+String(Math.random()).slice(2,9);
			
			dados.forEach((iten, index)=>{
				for(chav in dados[index]){
					if(chav == cha){
						dados[index][chav]['valor_total'] = calcularValorTotal(dados[index][chav]['Itens']);
						dados[index][chav]['Data'] = date.toLocaleDateString();
						dados[index][chav]['Hora'] = `${hora}:${minuto}:${segundo}`
						dados[index][chav]['Idtmp'] = keyreturn						
					}
				}

			})
			
			var KEY_FILTER;
			async function gravar(){
				await mongoose.connection.db.collection('pedidos').insertOne(dados[0][chav])
				
				while(dados.length){
					dados.pop();
				}				
				await mongoose.connection.db.collection('pedidos').findOne({Idtmp:`${keyreturn}`})
					.then(res =>{
						KEY_FILTER = res['_id'];
					}
				)
				//const OPERATION = {$unset:{Idtmp:""}}
		
				const OPERATION = {$set:{Idtmp:`${KEY_FILTER.toString()}`}}
				const FILTER = {_id:KEY_FILTER}
				await mongoose.connection.db.collection('pedidos').updateOne(FILTER, OPERATION)
				.then(res=>console.log('Pedido enviado com sucesso'))

			}
			gravar()

			break
	}
	
});

