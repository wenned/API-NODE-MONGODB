function home(req, res){

	res.send(`
				<div style="
					display:flex; 
					justify-content: center; 
					align-items:center; 
					flex-direction:column; 
					height: 100vh;">

				     =====================================
	
					<h1> 'API GEP' </h1>
					
					<h3 style="padding-bottom:20px;">Gerenciamento de Estoque e Pedidos</h3>
				    
					=====================================
					
					<button
						style="
							width: 15em;
							heigth: 4em;
							background-color: #07edadff;
							font-size: 1.5em;
							color: #fffff;
							border:none;
						"
					 >
					 Area Administracao
					 </button>

				</div>
	`)

};

export default home;
