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

			const persit = await fetch(`${config.couchdbUrl}/nupedidos/${data.rows[0].doc._id}`,
				{
					method: 'PUT',
					headers:{
						'Authorization': `Basic ${auth}`,
						'Content-type': 'application/json',
					},
					body: JSON.stringify(data.rows[0].doc)
				})

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
			
					const response = await fetch(`${config.couchdbUrl}/mesas/${args[1]}`,
						{
							method: 'GET',
							headers:{
							'Authorization': `Basic ${auth}`
						},
					});

					const data = await response.json();
				
					data.Estado = args[0];
					data.Chave = '';
		
					const estadoZero = await fetch(`${config.couchdbUrl}/mesas/${data._id}`,
						{
							method: 'PUT',
							headers:{
								'Authorization': `Basic ${auth}`,
								'Content-type': 'application/json',
							},
							body: JSON.stringify(data)
						});
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
					
					const persit = await fetch(`${config.couchdbUrl}/mesas/${dataresp.docs[0]._id}`,
						{
							method: 'PUT',
							headers:{
								'Authorization': `Basic ${auth}`,
								'Content-type': 'application/json',
							},
							body: JSON.stringify(dataresp.docs[0])
						});
					break

				case 2:
			
					const respdois = await fetch(`${config.couchdbUrl}/mesas/${args[1]}`,
						{
							method: 'GET',
							headers:{
							'Authorization': `Basic ${auth}`
						},
					});

					const dataDois = await respdois.json();				

					dataDois.Estado = args[0];
					dataDois.Chave = args[0];
		
					const estadoDois = await fetch(`${config.couchdbUrl}/mesas/${dataDois._id}`,
						{
							method: 'PUT',
							headers:{
								'Authorization': `Basic ${auth}`,
								'Content-type': 'application/json',
							},
							body: JSON.stringify(dataDois)
						});

					break
			}

		}catch(err){
			console.error('NAO FOI POSSIVEL FAZER A ALTERACAO NA MESA', err)
		};
	};

	async removerItemPedidoCouchdb(...args){
		
		const response_ = await fetch(`${config.couchdbUrl}/pedidos/${args[0]}`,
				{
					method: 'GET',
					headers:{
						'Authorization': `Basic ${auth}`
					},
				});

		const da_ = await response_.json();
		var bol = true;
		da_.Itens.splice(args[1], 1)
		
		if(da_.Itens.length == 0){bol = false}
		
		if(bol == true){

			const return_ =	tool.calculation_call(da_);	
	
			await fetch(`${config.couchdbUrl}/pedidos/${da_._id}`,
				{
					method: 'PUT',
					headers:{
						'Authorization': `Basic ${auth}`,
						'Content-type': 'application/json',
					},
					body: JSON.stringify(return_)
				});
		}else{
			await fetch(`${config.couchdbUrl}/pedidos/${da_._id}?rev=${da_._rev}`,
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
				
		const res_ = await fetch(`${config.couchdbUrl}/pedidos/${args[0]}`,
			{
				method: 'GET',
				headers:{
					'Authorization': `Basic ${auth}`
				},
			});

		const da__ = await res_.json();

		da__.Itens[args[1]].Item.Status[0] = "Feito"

		await fetch(`${config.couchdbUrl}/pedidos/${da__._id}`,
			{
				method: 'PUT',
				headers:{
					'Authorization': `Basic ${auth}`,
					'Content-type': 'application/json',
				},
				body: JSON.stringify(da__)
			});
	};

	async inseirItemPedidoFeitoCouchdb(...args){
	
		const res_ = await fetch(`${config.couchdbUrl}/pedidos/${args[0].first_id}`,
				{
					method: 'GET',
					headers:{
						'Authorization': `Basic ${auth}`
					},
				});

		const da__ = await res_.json();

		for(let i$ = 0; i$ < args[0].item.length; i$++){
			da__.Itens.push(args[0].item[i$])
		};
	
		await fetch(`${config.couchdbUrl}/pedidos/${da__._id}`,
			{
				method: 'PUT',
				headers:{
					'Authorization': `Basic ${auth}`,
					'Content-type': 'application/json',
				},
				body: JSON.stringify(da__)
			});
	};

};
