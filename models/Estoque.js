const mongoose = require('mongoose')

const EstoqueSchema = mongoose.model('Estoque',
	{
	"Carne":Number,
	"Id":String
})
module.exports = mongoose.model('Modelo', EstoqueSchema)
