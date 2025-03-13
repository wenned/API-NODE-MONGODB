import mongoose from 'mongoose'

async function fecharCaixa(req, res){

	try{
		mongoose.connection.db.collection('caixas').insertOne(req.body)
	
		var dadosRecebidos = req.body
		dadosRecebidos.Itens.forEach((element)=>{
			mongoose.connection.db.collection('pedidos').deleteOne({Nu_Pedido:element.Nu_Pedido})
		})

		res.send(true)
	}catch(error){
		console.error('Possivel erro na persistencia :', error)
	}
};

async function conferirCaixa(req, res){
	
	const {nome, id } = req.body
	
	mongoose.connection.db.collection('caixas').updateOne(
		{'Id':id},
		{$set: {'Verificador':nome, 'Verificado':true}}
	)
};

export {fecharCaixa, conferirCaixa} 
