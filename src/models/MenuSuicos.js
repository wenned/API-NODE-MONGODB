import mongoose from 'mongoose'

const SuicoSchema = new mongoose.Schema(
	{
	"Tipo":String,
	"Valor":Number
})

export default mongoose.model('MSuicos', SuicoSchema)
