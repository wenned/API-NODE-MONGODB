
async function fecharCaixa(req, res){
	
	console.log('em desenvolvimento')
	/*
	mongoose.connection.db.collection('caixas').insertOne(req.body)

	for(valor=0; valor < req.body.Itens.length; valor++){
		var keyRemove = req.body.Itens[valor]['Id']
		mongoose.connection.db.collection('pedidos').deleteOne({Id:keyRemove})
	}*/
	res.send(true)
};

async function conferirCaixa(req, res){
	console.log('em desenvolvimento')
}
export {fecharCaixa, conferirCaixa} 
