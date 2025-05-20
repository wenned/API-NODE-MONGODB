import { config } from '../config/env.js'
import toolCouchdb from './configCouchdb.js'

const auth = btoa(`${config.userId}:${config.userKey}`)

const tool = new toolCouchdb();

export default class  CouchdbUtils { 
	
	async alterarNumeroPedidoCouchDB (...args){
		
		try{

			//consultando documento
			const response = await fetch(`${config.couchdbUrl}/nupedidos/_all_docs?include_docs=true`,
				{
					method: 'GET',
					headers:{
						'Authorization': `Basic ${auth}`
					},
					credentials:'include'
				});

			const data = await response.json();
			data.rows[0].doc.Nu_pedido = args[0]

			//salvando no banco
			tool.persistence_doc('nupedidos', data.rows[0].doc, data.rows[0].doc._id);

		}catch(err){
			console.error('NAO FOI POSSIVEL SALVA ARQUIVO', err)
		}
	};
	
	async inserirPedidoCouchDb(...args){
			
		try{

			let mongoId = String(args[0]['_id']).split()
			const docCouch = {_id : mongoId[0], ...args[1] }
			
			const persitt = await fetch(`${config.couchdbUrl}/pedidos`,
				{
					method: 'POST',
					headers:{
						'Authorization': `Basic ${auth}`,
						'Content-type': 'application/json',
					},
					body: JSON.stringify(docCouch)
				})

		}catch(err){
			console.error('ERRO AO SALVAR PEDIDO NO COUCHDB', err)
		}
	};

	async atualizacaoMesas(...args){
		
		try{
			switch(args[0]){

				case 0:
					const response = await tool.find_doc('mesas', args[1]);

					response.Estado = args[0];
					response.Chave = '';
					
					tool.persistence_doc('mesas', data, data._id);
					break

				case 1:
					
					const resp = await fetch(`${config.couchdbUrl}/mesas/_find`,
						{
							method:'POST',
							headers: { 
								'Authorization' : `Basic ${auth}`,
								'Content-Type':'application/json'	
							},
							body : JSON.stringify({"selector" : {"Nome": args[1]}})
						});
					const dataresp = await resp.json();
					
					dataresp.docs[0].Estado = args[0]
					dataresp.docs[0].Chave = args[2]
					
					tool.persistence_doc('mesas', dataresp.docs[0], dataresp.docs[0]._id);
					break

				case 2:
					const response = await tool.find_doc('mesas', args[1]);
	
					response.Estado = args[0];
					response.Chave = args[0];

					tool.persistence_doc('mesas', dataDois, dataDois._id);	
					break
			}

		}catch(err){
			console.error('NAO FOI POSSIVEL FAZER A ALTERACAO NA MESA', err)
		};
	};

	async removerItemPedidoCouchdb(...args){
		
		const response = await tool.find_doc('pedidos', args[0]);

		var bol = true;
		response.Itens.splice(args[1], 1)
		
		if(response.Itens.length == 0){bol = false}
		
		if(bol == true){
	
			const return_ =	tool.calculation_call(response);	
		
			tool.persistence_doc('pedidos', return_, response._id);

		}else{
			await fetch(`${config.couchdbUrl}/pedidos/${response._id}?rev=${response._rev}`,
				{
					method: 'DELETE',
					headers:{
						'Authorization': `Basic ${auth}`,
						'Content-type': 'application/json',
					}
				});
		};
	};

	async marcaPedidoFeitoCouchdb(...args){
		
		const response = await tool.find_doc('pedidos', args[0]);
		response.Itens[args[1]].Item.Status[0] = "Feito"
		
		tool.persistence_doc('pedidos', response, response._id);
	};

	async inseirItemPedidoFeitoCouchdb(...args){
		
		const response = await tool.find_doc('pedidos', args[0].first_id);

		for(let i$ = 0; i$ < args[0].item.length; i$++){
			response.Itens.push(args[0].item[i$])
		};

		const return_ =	tool.calculation_call(response);	
	
		tool.persistence_doc('pedidos', return_, response._id);
	};

};
