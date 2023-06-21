import mongoose from 'mongoose'

const BebidaSchema = new mongoose.Schema(
	{
	"Tipo":String,
	"Valor":Number
})

export default mongoose.model('MBebida', BebidaSchema)
