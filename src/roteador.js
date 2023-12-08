const express = require('express');

const control = require('./controlador/control');

const roteador = express();

roteador.get('/produtos', control.listarProdutos)
roteador.get('/produtos/:idProduto', control.obterProduto)
roteador.get('/produtos/:idProduto/frete/:cep', control.calcularFrete)

module.exports = roteador;