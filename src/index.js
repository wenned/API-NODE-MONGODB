import express from 'express';
import session from 'express-session';

import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDatabase from './conectMongo.js';
import rotas from './rotas.js';

const app = express();

app.use(cookieParser());

app.use(session({
	
	secret:'GEP',
	resave: false,
	saveUninitialized: true

}));

app.use((req, res, next)=>{
	
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, PATCH, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	app.use(cors());
	next();

})

app.use(express.json());

app.use(rotas)

//Inicinando servidor

connectDatabase()
	.then(()=>{	
		app.listen(8080, ()=>{
			console.log('Servidor iniciado na porta 8080')
		});
	}).catch((err)=>{
		console.log('Erro ao Connectar a Base de Dados', err)
	});
