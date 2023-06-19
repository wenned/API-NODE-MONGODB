import mongoose from 'mongoose'

const NumeroSchema = new mongoose.Schema(
	{
	"Nu_pedido":Number
})

export default mongoose.model('nuPedido', NumeroSchema)
