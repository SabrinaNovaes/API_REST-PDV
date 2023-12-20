const express = require('express')
const routerClientes = express.Router()
const { listarClientes, detalharCliente, cadastrarCliente, atualizarCliente } = require('../controllers/controllerClientes')
const validarRequisicao = require("../middlewares/middlewareRequisicao")
const schemaCliente = require('../validations/schemaCliente')


routerClientes.post('/', validarRequisicao(schemaCliente), cadastrarCliente)
routerClientes.put('/:id', validarRequisicao(schemaCliente), atualizarCliente)
routerClientes.get('/', listarClientes)
routerClientes.get('/:id', detalharCliente)

module.exports = routerClientes