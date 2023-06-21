import mongoose from 'mongoose'

const FrancesSchema = new mongoose.Schema(
	{
	"Tipo":String,
	"Valor":Number
})

export default mongoose.model('MFrances', FrancesSchema)
