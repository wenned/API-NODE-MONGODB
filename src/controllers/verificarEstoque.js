import Pedido from '../models/Pedidos.js'
import Estoque from '../models/Estoque.js'

function calcularValorTotal(...args){

	var soma=0;
	
    for (var iten=0; iten < args[0].length; iten++){
		soma = soma + (args[0][iten]['Item']['Quantidade'] * args[0][iten]['Item']['Valor'])
    };
	
    return soma.toFixed(2);
};

async function ResultEstoque(key, valor){

	try {
		
		const result = await Estoque.find({});
		
		for (var index=0; index < result.length; index++) {
			
			var re = await Estoque.findById(String(result[index]['_id']));
			if (re.Quantidade >= valor) {
				return { "Sabor": key, "Quantidade": true };
			} else {
				return { "Sabor": key, "Quantidade": false };
				}
			}

		} catch (err) {
			console.log('Erro ao processar verificacao de estoque', err);
		};
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

export {calcularValorTotal, CalculoStoque, ResultEstoque};
