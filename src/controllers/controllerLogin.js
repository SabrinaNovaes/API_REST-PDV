const knex = require('../connection/conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const senhaHash = process.env.SENHA_JWT

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuario = await knex('usuarios').where({ email }).first()

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' })
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: 'Email ou senha inválidos' })
        }

        const token = jwt.sign({ id: usuario.id }, senhaHash, { expiresIn: '30d' })

        const { senha: _, ...dadosUsuario } = usuario

        return res.status(200).json({ usuario: dadosUsuario, token })
    } catch (error) {
        return res.status(400).json({ mensagem: 'Não autorizado' })
    }
}

module.exports = login