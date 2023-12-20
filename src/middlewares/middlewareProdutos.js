const knex = require("../connection/conexao");
require("dotenv").config();

const cadastrarProduto = async (req) => {
  const body = req.body;

  const { descricao, quantidade_estoque, valor, categoria_id } = body;

  return await knex("produtos")
    .insert({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    })
    .returning(["*"]);
};

const selecionarCategoriaPorId = async (categoria_id) => {
  return await knex("categorias").where({ id: categoria_id }).first();
};

const selecionarProdutoPorCategoria = async (idCategoria) => {
  return await knex("produtos").where({ categoria_id: idCategoria });
};

const selecionarProdutoPorId = async (idProduto) => {
  return await knex("produtos").where({ id: idProduto }).first();
};

const atualizarDadosProduto = async (req, id) => {

  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  return await knex("produtos")
    .where("id", "=", id)
    .update({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    })
    .returning(["*"]);
};

const selecionarTodosProdutos = async () => {
  return await knex("produtos").select("*");
};


module.exports = {
  cadastrarProduto,
  selecionarTodosProdutos,
  selecionarCategoriaPorId,
  selecionarProdutoPorCategoria,
  selecionarProdutoPorId,
  atualizarDadosProduto,
};
