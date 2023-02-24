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
		//await mongoose.connection.db.collection('pedidos_diario').insertOne({codigo:10, descricao:"tv"})
		//await mongoose.connection.db.collection('pedidos_diario').deleteOne({codigo:10, descricao:"tv"})
	

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

app.put('/input/', (req, res)=>{
	
	switch(req.body.express){
	
		case 'addnew':
	
			dados.forEach((iten,index)=>{

			for(chav in dados[index]){
				if(chav === req.body.key){
					var valor = {"Item":""}
					valor['Item'] = req.body.Item
					dados[index][req.body.key]['Itens'].push(valor)
					dados[index][req.body.key]['valor_total'] = calcularValorTotal(dados[index][req.body.key]['Itens'])

					if(dados[index][req.body.key]['Status'] == 'Pendente'){
						//
					}else{
						if(dados[index][req.body.key]['Status'] == 'Finalizado'){
							dados[index][req.body.key]['Status'] = 'Pendente'
						}

					}


					res.send(dados[index][req.body.key])
					}
				}
			});
			break

		case 'pagar':
			break

		case 'feito':

			dados.forEach((iten,index)=>{

			for(chav in dados[index]){

				if(chav === req.body.key){
					
					dados[index][req.body.key]['Itens'][req.body.id]['Item']['Status'] = 'Feito'
					
					var cont=0
					for (i=0; i<dados[index][req.body.key]['Itens'].length; i++ ){
						if(dados[index][req.body.key]['Itens'][i]['Item']['Status'] == 'Feito'){
							cont++
						}
					}

					if (cont == dados[index][req.body.key]['Itens'].length){
						dados[index][req.body.key]['Status'] = 'Finalizado'
					}
					res.send(dados[index])
					}
				}
			});

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
	return soma;
}


app.post('/inserir',(req, res)=>{

	switch(req.body.express){

		case 'addbanco':
			res.send('Gravado com sucesso no Banco de dados')
			break

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
				await mongoose.connection.db.collection('pedidos_diario').insertOne(dados[0][chav])
				
				while(dados.length){
					dados.pop();
				}				
				await mongoose.connection.db.collection('pedidos_diario').findOne({Idtmp:`${keyreturn}`})
					.then(res =>{
						KEY_FILTER = res['_id'];
					}
				)
				const OPERATION = {$unset:{Idtmp:""}}
				const FILTER = {_id:KEY_FILTER}
				await mongoose.connection.db.collection('pedidos_diario').updateOne(FILTER, OPERATION)
				.then(res=>console.log('Campo removido com sucesso'))

			}
			gravar()

			break
	}
	
});

