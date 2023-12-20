require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routerLogin = require('./routes/routesLogin')
const routerCategoria = require('./routes/routesCategorias')
const routerUsuario = require('./routes/routesUsuario')
const verificarLogin = require('./middlewares/middlewareLogin')
const routerClientes = require('./routes/routesClientes')
const routerProdutos = require('./routes/routesProdutos')
const routerPedido = require('./routes/routesPedidos')


const app = express()

app.use(express.json())
app.use(cors())

app.use('/login', routerLogin)

app.use('/categoria', routerCategoria)
app.use('/usuario', routerUsuario)

app.use(verificarLogin)

app.use('/cliente', routerClientes)
app.use('/produto', routerProdutos)
app.use('/pedido', routerPedido)


app.listen(process.env.PORT || 3000);