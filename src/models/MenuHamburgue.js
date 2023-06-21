import mongoose from 'mongoose'

const HamburgSchema = new mongoose.Schema(
	{
		"Tipo":String,
		"Valor":Number,
		"Descricao":Array
	}
)

export default mongoose.model('MHamburguer', HamburgSchema)
