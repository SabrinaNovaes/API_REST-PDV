const knex = require("../connection/conexao");
const bcrypt = require("bcrypt");
require("dotenv").config();

const usuarioPorID = async (idUsuario) => {
  return await knex("usuarios").where({ id: idUsuario }).first();
};

const usuarioPorEmail = async (email) => {
  return await knex("usuarios").where({ email }).first();
};

const criptografarSenhaUsuario = async (senha) => {
  return await bcrypt.hash(senha, 10);
};

const verificarSenhaCorreta = async (email, senha) => {
  const usuario = await usuarioPorEmail(email);
  return await bcrypt.compare(senha, usuario.senha);
};

const dadosUsuarioLogado = async (idUsuario) => {
  const usuario = await usuarioPorID(idUsuario);

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
  };
};

const atualizarDadoDoUsuario = async (nome, email, senha, id) => {
  const senhaCriptografada = await criptografarSenhaUsuario(senha);
  const atualizarUsuario = await knex("usuarios")
    .where("id", "=", id)
    .update({
      nome,
      email,
      senha: senhaCriptografada,
    })
    .returning(["id", "nome", "email"]);

  return atualizarUsuario;
};

module.exports = {
  usuarioPorID,
  usuarioPorEmail,
  criptografarSenhaUsuario,
  verificarSenhaCorreta,
  dadosUsuarioLogado,
  atualizarDadoDoUsuario,
  
};