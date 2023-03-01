const mongoose = require('mongoose')

const Modelo = mongoose.model('Estoque',
	{
	"Carne":Number,
	"Id":String
})

module.exports = Modelo
