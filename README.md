# API de Cálculo de Frete

## Visão geral do projeto
Este projeto consiste em uma API para o cálculo de custos de frete para produtos. A API possui três rotas do tipo GET, todas seguindo padrões REST.

*GET /produtos:* Lista os produtos disponíveis a partir do arquivo produtos.js no diretório bancodedados.

*GET /produtos/:idProduto:* Fornece informações detalhadas sobre um produto específico com base no ID do produto fornecido.

*GET /produtos/:idProduto/frete/:cep:* Calcula o custo de frete para um produto específico e um CEP de destino fornecido. Para determinar o estado com base no CEP, a API utiliza a função getStateFromZipcode da biblioteca utils-playground, que pode ser encontrada no NPM.

## Regras para Cálculo de Frete:
1) O custo de frete padrão é 12% do valor do produto.
2) Para os estados BA, SE, AL, PE e PB, o custo de frete é de 10%.
3) Para os estados SP e RJ, o custo de frete é de 15%.

## Observações
1) Certifique-se de utilizar await quando uma função envolver promises.
2) Todas as rotas devem seguir o mais fielmente possível os padrões REST.
3) Garanta que todas as requisições sejam assíncronas.

## Executando o projeto
1) Instalar todas as dependências
- Express, nodemon e utils-playgroung
2) Executar o projeto

## Estrutura de Arquivos
**1.1 index.js:** 
O arquivo index.js serve como o ponto de entrada do aplicativo. Ele cria uma instância do Express, configura o middleware para interpretar JSON e utiliza o roteador definido no arquivo roteador.js.
O aplicativo é configurado para escutar na porta 8000.

**1.2 roteador.js:**
O arquivo roteador.js é responsável por definir as rotas da API utilizando o express.Router(). As rotas /produtos, /produtos/:idProduto e /produtos/:idProduto/frete/:cep estão vinculadas aos métodos correspondentes no controlador.

**1.3 bancodedados/produtos.js:**
A pasta bancodedados contém um arquivo chamado produtos.js que simula um banco de dados. Este arquivo exporta um array de objetos, cada um representando um produto com propriedades como id, nome e valor.

**1.4 controlador/control.js:**
O arquivo control.js dentro da pasta controlador contém funções que serão chamadas quando uma rota específica é acessada:

*listarProdutos:* 
Retorna a lista de produtos.

*obterProduto:*
Obtém detalhes de um produto com base no ID fornecido. Trata erros caso o produto não seja encontrado.

*calcularFrete:*
Calcula o custo de frete para um produto com base no ID e no CEP fornecidos, seguindo as regras especificadas. Trata erros e utiliza a função assíncrona getStateFromZipcode para obter o estado a partir do CEP.

## Resultados
### Listagem de Produtos
![](./assets/produtos.png)