import mongoose from 'mongoose'

const MesaSchema = new mongoose.Schema(
	{
	"Nome":String,
	"Estado":Boolean
})

export default mongoose.model('Mesas', MesaSchema)
