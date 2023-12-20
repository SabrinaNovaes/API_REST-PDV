const express = require('express')
const multer = require('../middlewares/middlewareMulter');
const routerProdutos = express.Router()

const { cadastrarProdutos, editarDadosProduto, deletarProdutoId, listarProdutos, detalharProduto} = require('../controllers/controllerProdutos');
const validarRequisicao = require('../middlewares/middlewareRequisicao');
const schemaCadastroeAtualizacaoProduto = require('../validations/schemaProdutos');

routerProdutos.post('/', multer.single('produto_imagem'), validarRequisicao(schemaCadastroeAtualizacaoProduto), cadastrarProdutos);
routerProdutos.patch('/:id', multer.single('produto_imagem'), validarRequisicao(schemaCadastroeAtualizacaoProduto), editarDadosProduto);
routerProdutos.get('/', listarProdutos);
routerProdutos.get('/:id', detalharProduto);
routerProdutos.delete('/:id', deletarProdutoId);

module.exports = routerProdutos