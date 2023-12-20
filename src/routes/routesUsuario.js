const express = require('express')
const routerUsuario = express.Router()

const { cadastrarUsuario,
        atualizarUsuario,
        detalharUsuario } = require('../controllers/controllerUsuario')
const validarRequisicao = require("../middlewares/middlewareRequisicao")
const schemaUsuario = require('../validations/schemaUsuario')
const verificarLogin = require("../middlewares/middlewareLogin")

routerUsuario.post('/', validarRequisicao(schemaUsuario), cadastrarUsuario)

routerUsuario.put('/', validarRequisicao(schemaUsuario), verificarLogin, atualizarUsuario )
routerUsuario.get('/', verificarLogin, detalharUsuario)

module.exports = routerUsuario