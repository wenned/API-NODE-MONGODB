import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
	Item:{
		Sabor: [String],
		Valor: Number,
		Quantidade: Number,
		Tipo: String,
		Status: [String],
		Adicional: [String]
	}
});

const Mpedido = new mongoose.Schema(
	{
	"Data":{
		type:Date,
		default: Date.now()
		},
	"Itens":[ItemSchema],
	"valor_total":{type:Number},
	"Status":{type:String},
	"Nu_Pedido":{type:String}
})

export default mongoose.model('Pedido', Mpedido)
