const express = require ('express')
const routerLogin = express.Router()

const login = require("../controllers/controllerLogin")
const validarRequisicao = require("../middlewares/middlewareRequisicao")
const loginSchema = require("../validations/schemaLogin")

routerLogin.post('/', validarRequisicao(loginSchema), login)

module.exports = routerLogin