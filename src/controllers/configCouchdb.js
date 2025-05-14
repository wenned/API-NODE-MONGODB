import { config } from '../config/env.js'

const auth = btoa(`${config.userId}:${config.userKey}`)

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

	async persistence_doc(banco, doc, id){
		
		await fetch(`${config.couchdbUrl}/${banco}/${id}`,			{
				method: 'PUT',
				headers:{
					'Authorization': `Basic ${auth}`,
					'Content-type': 'application/json',
				},
				body: JSON.stringify(doc)
			});
	};

	async find_doc(banco, id){
		
		const res_ = await fetch(`${config.couchdbUrl}/${banco}/${id}`,
				{
					method: 'GET',
					headers:{
						'Authorization': `Basic ${auth}`
					},
				});

		const da__ = await res_.json();
		return da__;

	};
};
