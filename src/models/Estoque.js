import mongoose from 'mongoose'

const EstoqueSchema = new mongoose.Schema(
	{
	"Tipo":String,
	"Quantidade":Number
})

export default mongoose.model('Estoque', EstoqueSchema)
