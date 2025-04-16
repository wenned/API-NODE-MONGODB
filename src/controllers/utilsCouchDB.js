import { config } from '../config/env.js'

export async function alterarNumeroPedidoCouchDB (...args){
	
	const auth = btoa(`${config.userId}:${config.userKey}`)

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
		console.error(err)
	}
};
