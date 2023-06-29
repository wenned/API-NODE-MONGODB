import Estoque from '../models/Estoque.js'

async function AlteraStoque(...args){

	for(var index=0; index < args[0].length; index++){

		const sabor =  	args[0][index]['Item']['Sabor']

		for(var item=0; item < sabor.length; item++){
			const ItemEstoque = await Estoque.findOne({Tipo:sabor[item]});
			const newQuantidade = ItemEstoque.Quantidade - args[0][index]['Item']['Quantidade']
			await Estoque.updateOne({Tipo:sabor[item]}, {Quantidade:newQuantidade})
		}
	}
};

export default AlteraStoque;
