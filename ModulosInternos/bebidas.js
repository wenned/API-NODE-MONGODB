 const mongoose = require('mongoose');
 mongoose.set('strictQuery', true);
const connect = require('../conect_Mongo');
 
 async function retornoOne(a) {
	 try {
		 const connection = await connect;
		 try{
				 var res = await connection.db.collection('estoques').findOne({[a]:{$gt:0}})
				 if(res === null){
				 }else{
					 return true
				 };
				}catch(erro){
					console.log(erro)
				};

	} catch (err) {
		console.log('Erro ao processar verificacao de estoque', err);
	};
 };

 
 async function retornoTwo(b) {
	 try {
		 const connection = await connect;
			 try{
				 var cont=0;
				 for(item in b){
					 var res = await mongoose.connection.db.collection('estoques').findOne({[b[item]]:{$gt:0}})
					 if(res === null){
						 cont++
					 };
				};
				if(cont === 0){return true}

				}catch(erro){
					console.log(erro)
				};

	} catch (err) {
		console.log('Erro ao processar verificacao de estoque', err);
	};
 };


module.exports = { retornoOne, retornoTwo };

