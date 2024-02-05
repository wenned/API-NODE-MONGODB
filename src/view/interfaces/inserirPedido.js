import Product from '../../controllers/insertProduct.js'  

async function inserirPedido(req, res){
	
	var dados = []
	
	dados.push(req.body);

	let product = new Product(dados)
	let retInstancia = product.inserirProduct();
	res.status(201).json(retInstancia)
};

export default inserirPedido;
