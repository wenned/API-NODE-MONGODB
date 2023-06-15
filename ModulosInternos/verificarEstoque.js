const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connect = require('../conectMongo');

async function ResultEstoque(key, valor) {

		try {

			const connection = await connect;
			const result = await connection.db.collection('estoques').find().toArray();
    
			for (let index in result) {
				if (key in result[index]) {
					const re = await connection.db.collection('estoques').findOne({ Id: result[index]['Id'] });
					if (re[key] >= valor) {
						return { "Sabor": key, "Quantidade": true };
					} else {
						return { "Sabor": key, "Quantidade": false };
					}
				}
			}
		} catch (err) {
			console.log('Erro ao processar verificacao de estoque', err);
		}
};

async function CalculoStoque(args) {
  
	const DICE_$ = [];
	
	try {
		for (let index in args) {
			
			const Key = args[index]['Item']['Quantidade'];
			const looP = args[index]['Item']['Sabor'];
			
			for (let item in looP) {
				switch (looP[item]) {
					case 'Carne':
					case 'Carne-sol':
					case 'Queijo':
					case 'Frango':
					case 'Presunto':
					case 'Bacon':
					case 'Cheddar':
					case 'Catupiry':
					case 'Calabresa':
					case 'Salsicha':
					case 'Chocolate':
					case 'Goiabada':
					case 'Banana':
					case 'Canela':
					case 'Palmito':
					case 'Azeitona':
						DICE_$.push(await ResultEstoque(looP[item], Key));
						break;
					default:
						break;
				}
			}
		}
		
		let cont = true;
    
		const returnFalse = [];
		
		for (let ind in DICE_$) {
			if (DICE_$[ind]['Quantidade'] === false) {
				returnFalse.push(DICE_$[ind]);
				cont = false;
			}
		}
		if (cont === false) {
			return returnFalse;
		} else {
			return true;
		}
	} catch (err) {
		console.log(err);
	}
}

module.exports = { ResultEstoque, CalculoStoque };
