import Pedido from '../models/Pedidos.js'
import Mesas from '../models/Mesas.js'
import Estoque from '../models/Estoque.js'
import MBebida from '../models/MenuBebidas.js'
import MPasteis from '../models/MenuPasteis.js'
import MFrances from '../models/MenuFrances.js'
import MSuicos from '../models/MenuSuicos.js'
import MHamburguer from '../models/MenuHamburgue.js'


class ProductInformacao {

	constructor (value = false){
		this.value = value
	}
			
	async pedidoUnico(){
		
		try{		
			if(this.value.id === undefined){
				const numero_pedido = await Pedido.findOne({Nu_Pedido:this.value.numero_pedido});		
				return numero_pedido
			}else{
				const pedidoUnico = await Pedido.findOne({_id:this.value.id});
				return pedidoUnico
			}

			}catch(err){
				return false
			}
	}

	async getMesas (){
		try{
			const mesas = await Mesas.find();
			return mesas
		}catch(err){
			return false
		}
	}

	async getMesaUnica(){
		
		try{	
			const mesaUnica = await Mesas.findOne({Nome:this.value.numero_pedido.trim()});		
			return mesaUnica
			
		}catch(err){
				return err
			}
	}

	
	async getEstoque (){
		try{
			const estoque = await Estoque.find();
			return estoque
		}catch(err){
			return false
		}
	}

	async getBebidas (){
		try{
			const drinks = await MBebida.find();
			return drinks
		}catch(err){
			return false
		}
	}

	async getPasteis (){
		try{
			const menuPasteis = await MPasteis.find();
			return menuPasteis
		}catch(err){
			return false
		}
	}

	async getFrances (){
		try{
			const menuFrances = await MFrances.find();
			return menuFrances
		}catch(err){
			return false
		}
	}

	async getSuicos (){
		try{
			const menuSuico = await MSuicos.find();
			return menuSuico
		}catch(err){
			return false
		}
	}

	async getHamburg (){
		try{
			const menuHamburg = await MHamburger.find();
			return menuHamburg
		}catch(err){
			return false
		}
	}

	async getPedidosFeitos (){
		try{
			
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
				return view
				cont = false
			}else{ return false }

		}catch(err){
			return false
		}
	}

	async getPedidosPendentes (){
		try{
			
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
				return view
				cont = false
			}else{ return false }

		}catch(err){
			return false
		}
	}
}

export default ProductInformacao;
