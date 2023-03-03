const mongoose = require('mongoose')

const Mpedido = mongoose.model('Estoque',
	{
	"Data":Number,
	"Itens":String,
	"valor_total":String,
	"Status":String,
	"Id":String,
	"Nu_Pedido":String
})

module.exports = Mpedido
