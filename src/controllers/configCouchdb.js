export default class toolCouchdb{
	
	calculation_call(...args){
		var soma = 0;
		var dados = args[0]	
		try{

			for(var item=0; item < args[0].Itens.length; item++){
				soma += args[0].Itens[item].Item.Valor
			};
			dados.valor_total = soma;
			return dados;

		}catch(err){console.error('NAO FOI POSSIVEL OBTER A SOMA', err)}
	};
};
