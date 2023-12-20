const jwt = require('jsonwebtoken')
const knex = require('../connection/conexao')

const senhaHash = process.env.SENHA_JWT

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' })
    }

    try {
        
        const token = authorization.split(' ')[1]

        const { id } = jwt.verify(token, senhaHash)
        
        const usuarioExiste = await knex('usuarios').where({ id }).first()

        if (!usuarioExiste) {
            return res.status(401).json({ mensagem: 'Não autorizado' })
        }

        const { senha, ...usuario } = usuarioExiste

        req.usuario = usuario

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = verificarLogin