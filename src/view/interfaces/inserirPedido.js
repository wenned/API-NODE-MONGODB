import Product from '../../controllers/insertProduct.js'  

async function inserirPedido(req, res){
	
	try{
		let product = new Product(JSON.parse(JSON.stringify(req.body)))
		let retornoInstancia = await product.inserirProduct(product);
		res.status(201).json(retornoInstancia)
	}catch(err){
		res.status(401).json('Erro ao persistir dados :' +err)
	}
};

export default inserirPedido;
