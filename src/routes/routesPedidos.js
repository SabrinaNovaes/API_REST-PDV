const express = require('express')
const routerPedido = express.Router()

const { cadastrarPedido, listarPedidos} = require('../controllers/controllerPedido');
const validarRequisicao = require('../middlewares/middlewareRequisicao');
const schemaPedido = require('../validations/schemaPedido');
const { verificarClienteNoBody } = require('../middlewares/middlewarePedido');


routerPedido.post('/', validarRequisicao(schemaPedido), cadastrarPedido);
routerPedido.get('/', listarPedidos);

module.exports = routerPedido;


