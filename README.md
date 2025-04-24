# Rest API -

## Tecnologias usadas;
	- Express
	- Node.Js
	- MongoDB
    - CouchDB


## API para o Sistema de Autoatendimento Eletrônico e Controle de Caixa de Restaurante/Bar

API é uma solução avançada e flexível, desenvolvida em Node.js e integrada ao MongoDB e CouchDB, projetada para atender às necessidades específicas de restaurantes,
bares e estabelecimentos similares. Esta API é uma solução completa para modernização seu restaurantes ou bares, aumentar a eficiência operacional e proporcionar
 uma experiência mais conveniente aos clientes..

## Recursos Principais:

## Gestão de Cardápio: 
	- Crie e atualize facilmente itens de cardápio, categorias de alimentos e bebidas, preços e 
    descrições. Os clientes podem explorar o cardápio em seus dispositivos e fazer pedidos com facilidade.
 
## Pedidos e Pagamentos Online: 
	- Os clientes podem fazer pedidos diretamente de seus dispositivos, enviar pedidos à cozinha e
    efetuar pagamentos online de forma segura e conveniente.
 
## Integração de Caixa: 
	- Registre e controle todas as transações de caixa, incluindo pagamentos em dinheiro,
    cartões de crédito e outros métodos de pagamento mantendo um histórico preciso de todas as vendas.
 
## Gestão de Estoque: 
	- Monitore o estoque de ingredientes e produtos em tempo real. Receba alertas quando os níveis
    de estoque estiverem baixos e automatize pedidos de reposição.
 
## Relatórios e Análises: 
	- Tenha insights valiosos sobre o desempenho do seu estabelecimento com relatórios detalhados
    sobre vendas, inventário, pedidos e muito mais.
 
## Integração de Mesa e Comanda: 
	- Associe pedidos a mesas específicas e gerencie comandas com facilidade.
    - Os clientes podem solicitar serviços sem chamar um garçom.

## Personalização e Branding: 
	- Personalize a interface e a experiência do usuário com sua marca,
    incluindo logotipo, cores e design.
 
## Segurança e Autenticação: 
	- Proteja os dados do cliente e do restaurante com recursos avançados 
    de autenticação e segurança.


## Solicitacoes de pontos

- Rota: PUT `seu_servidor/inserir`, inserindo pedido:
- Exemplo

```json
    { 
        "Itens":[
            {
                "Item":{
                    "Sabor" :["Item"],
                    "Valor" : 0000,
                    "Quantidade" : 0,
                    "Tipo" : "tipo_categoria_item",
                    "Status" : ["Pendente","false"],
                    "Adicional" : [""] 
                }
            }
        ],
        "Valor_total" : "",
        "Status" : "Pendente",
        "Nu_Pedido" : ""
    }

```

- Rota: PUT `seu_servidor/entrada/liberaMesa`, alterando estado para ocupado:
- Exemplo

```json
    { 
        "operacao":0,
        "id":"id_mesa"
    }
```
