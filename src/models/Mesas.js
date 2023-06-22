import mongoose from 'mongoose'

const MesaSchema = new mongoose.Schema(
	{
		"Nome":String,
		"Estado":Number,
		"Chave":String
	}
);

export default mongoose.model('Mesas', MesaSchema)
