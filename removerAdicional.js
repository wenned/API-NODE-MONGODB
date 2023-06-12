// Modulo de removocao de adicional!
const mongoose = require('mongoose')

async function removerADicional(...args){
	const [itens, conexao] = args
	
	await conexao.connect()
	//const itensEstoque = await conexao.connection.db.collection('estoques').find().toArray();
	//console.log(itensEstoque)
	if(args[0].length > 99999){
	
		for(index in args[0]){
			console.log(args[0][index])
		}
	}
	
}

module.exports = removerADicional;
