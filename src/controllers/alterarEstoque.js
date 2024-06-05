import Estoque from '../models/Estoque.js'

async function AlteraStoque(...args){

	for(var index=0; index < args[0].length; index++){
	
		const sabor =  	args[0][index]['Item']['Sabor']

		for(var item=0; item < sabor.length; item++){
			const ItemEstoque = await Estoque.findOne({Tipo:sabor[item]});
			const newQuantidade = ItemEstoque.Quantidade - args[0][index]['Item']['Quantidade']
			await Estoque.updateOne({Tipo:sabor[item]}, {Quantidade:newQuantidade})
		};
	};
	
	for(var i = 0; i < args[0].length; i++){
		
		const item = args[0][i]['Item']['Adicional'];
			
		for(var it = 0; it < item.length; it++){
			const take = await Estoque.findOne({Tipo:item[it]});
			const newValue = take.Quantidade - 1
			await Estoque.updateOne({Tipo:item[it]}, {Quantidade:newValue})
		};
	};

};

async function retornaEstoque(...args){

	for(var Index=0; Index < args[0].length; Index++){

		const sabor =  	args[0][Index]['Item']['Sabor']

		for(var Item=0; Item < sabor.length; Item++){
			const ItemEstoque = await Estoque.findOne({Tipo:sabor[Item]});
			const newQuantidade = ItemEstoque.Quantidade + args[0][Index]['Item']['Quantidade']
			await Estoque.updateOne({Tipo:sabor[Item]}, {Quantidade:newQuantidade})
		}
	}
/*	
	for(var i = 0; i < args[0].length; i++){
		
		const item = args[0][i]['Item']['Adicional'];
			
		for(var it = 0; it < item.length; it++){
			const take = await Estoque.findOne({Tipo:item[it]});
			const newValue = take.Quantidade + 1
			await Estoque.updateOne({Tipo:item[it]}, {Quantidade:newValue})
		};
	};
*/
};


export {AlteraStoque, retornaEstoque};
