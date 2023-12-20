const express = require('express')
const routerCategoria = express.Router()
const listarCategoria = require('../controllers/controllerCategorias')

routerCategoria.get('/', listarCategoria)

module.exports = routerCategoria