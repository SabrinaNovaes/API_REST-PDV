const bcrypt = require("bcrypt");
const knex = require("../connection/conexao");
const {
  atualizarDadoDoUsuario,
  usuarioPorEmail,
} = require("../middlewares/middlewareUsuario");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const users = await knex('usuarios')
      .where({ email: email });

    if (users.length > 0) {
      return res.status(400).json({ message: "Email já existe." });
    }

    const passwordBcrypt = await bcrypt.hash(senha, 10);

    const novoUsuario = await knex("usuarios").insert({
      nome,
      email,
      senha: passwordBcrypt,
    }).returning(['nome', 'email', 'senha']);

    return res.status(201).json(novoUsuario[0]);
  } catch (error) {
    return res.status(500).json( error.message );
  }
}

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario;

  try {
    if (email !== req.usuario.email) {
      const usuario = await usuarioPorEmail(email);

      if (usuario) {
        return res
          .status(400)
          .json({ mensagem: "O email informado já existe" });
      }
    }

    const atualizarUsuario = await atualizarDadoDoUsuario(
      nome,
      email,
      senha,
      id
    );

    return res.status(200).json(atualizarUsuario);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const detalharUsuario = async (req, res) => {
  return res.status(200).json(req.usuario)
}

module.exports = {
  cadastrarUsuario,
  atualizarUsuario,
  detalharUsuario
}