import Pedido from '../models/Pedidos.js'
import Mesas from '../models/Mesas.js'
import Estoque from '../models/Estoque.js'
import MBebida from '../models/MenuBebidas.js'
import MPasteis from '../models/MenuPasteis.js'
import MFrances from '../models/MenuFrances.js'
import MSuicos from '../models/MenuSuicos.js'
import MHamburguer from '../models/MenuHamburgue.js'



async function getInformacao (req, res) {

	try{

		switch(req.params.Info){
				
				case 'pedidoUnico':
					
					try{
						const getPedidoUnico = await Pedido.findOne({Nu_Pedido:req.params.Mesa});
						res.status(201).json(getPedidoUnico)
					}catch(err){
						res.status(500).send(false)
					}

					break

				case 'pedidosFeito':
			
					const getFeito = await Pedido.find();
		
					var cont = false
					var view =[]
		
					for(var Iten=0; Iten < getFeito.length; Iten++){
			
						if(getFeito[Iten]['Status'] === 'Finalizado'){
							view.push(getFeito[Iten])
						}
						if(view.length === 1){
							cont = true;
						}
					}

					if(cont){
						res.send(view)
						cont = false

					}else{ res.send(false) }

					break
				
				case 'mesas':
		
					const getMesas = await Mesas.find();
					res.send(getMesas)

					break
				
				case 'Mesa':
				
					const getUnica = await Mesas.find({'Nome':req.params.Mesa})
					res.status(201).json(getUnica)
					break
	
				case 'estoque':
					
					const getEstoque = await Estoque.find();
					res.send(getEstoque)
					break

				case 'pedidosPendente':
		
					const schemas = await Pedido.find();
		
					var cont = false
					var view =[]
		
					for(var Iten=0; Iten < schemas.length; Iten++){
			
						if(schemas[Iten]['Status'] === 'Pendente'){
							view.push(schemas[Iten])
						}
						if(view.length === 1){
							cont = true;
						}
					}

					if(cont){
						res.send(view)
						cont = false

					}else{ res.send(false) }

					break
				
				case 'menu_bebidas':

					const getBebidas = await MBebida.find();
					res.status(200).send(getBebidas)
					break

				case 'menu_pasteis':
					
					const getPasteis = await MPasteis.find();
					res.status(200).send(getPasteis)
					break

				case 'menu_frances':
					
					const getFrances = await MFrances.find();
					res.status(200).send(getFrances)
					break

				case 'menu_suicos':
					
					const getSuico = await MSuicos.find();
					res.status(200).send(getSuico)
					break

				case 'menu_hamburgues': //EM DESEMVOLVIMENTO
					
					const getHamburgue = await MHamburguer.find();
					res.status(200).send(getHamburgue)
					break
								
				default:
					break
			}

		}catch(err){
			res.status(500).send('Server error', err)
		};	
};

export default getInformacao;
