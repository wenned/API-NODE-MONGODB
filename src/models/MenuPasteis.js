import mongoose from 'mongoose'

const PastelSchema = new mongoose.Schema(
	{
	"Tipo":String,
	"Valor":Number
})

export default mongoose.model('MPasteis', PastelSchema)
