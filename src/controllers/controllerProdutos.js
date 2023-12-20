const knex = require("../connection/conexao");
const {
  selecionarTodosProdutos,
  selecionarProdutoPorCategoria,
  selecionarCategoriaPorId,
} = require("../middlewares/middlewareProdutos");
const { uploadImagem, excluirImagem } = require('../services/uploads');


const listarProdutos = async (req, res) => {
  const query = req.query;
  const { categoria_id } = query;

  try {

    if (categoria_id) {

      const produtoPorCategoria = await selecionarProdutoPorCategoria(categoria_id);

      return res.status(200).json(produtoPorCategoria);
    }

    const listaProdutos = await selecionarTodosProdutos("produtos");

    return res.status(200).json(listaProdutos);

  } catch (error) {

    return res.status(500).json({ messagem: "Erro interno do servidor" });
  }
};
const detalharProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await knex("produtos").where({ id }).first();

    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado'})
    }

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(500).json({ messagem: "Erro interno do servidor" });
  }
}

const cadastrarProdutos = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body
  const { originalname, mimetype, buffer } = req.file

  if (!descricao && !valor && !quantidade_estoque && !categoria_id && !originalname && !mimetype && !buffer) {
    return res.status(400).json('Os campos descricao, quantidade_estoque, valor e categoria_id são obrigatórios.');
  }

  if (isNaN(valor) || isNaN(quantidade_estoque) || isNaN(categoria_id)) {
    return res.status(400).json('Os campos quantidade_estoque, valor e categoria_id devem ser numéricos.');
  }
  
  try {
    const categoriaSelecionada = await selecionarCategoriaPorId(categoria_id);

    if (!categoriaSelecionada) {
        return res.status(400).json({ mensagem: "Informe uma categoria válida" });
    }

    let produto = await knex('produtos')
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id
      }).returning('*')

    if (!produto) {
      return res.status(400).json('O produto nao foi cadastrado');
    }

    const id = produto[0].id


    if (req.file) {
      const imagem = await uploadImagem(
        `produtos/${id}/${originalname}`,
        buffer,
        mimetype
      )
      produto = await knex('produtos').update({
        produto_imagem: imagem.url
      }).where({ id })
        .returning(['descricao', 'quantidade_estoque', 'valor', 'categoria_id', 'produto_imagem'])
    }

    return res.status(200).json(produto);
  }
  catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

const editarDadosProduto = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { originalname, mimetype, buffer } = req.file

  if (!descricao && !quantidade_estoque && !valor && !categoria_id && !originalname && !mimetype && !buffer) {
    return res.status(404).json('Informe ao menos um campo para a atualização do produto');
  }

  try {
    const produtoEncontrado = await knex('produtos').where({ id: id }).first();
    if (!produtoEncontrado) {
      return res.status(404).json('Produto não encontrado');
    }

    if (req.file) {
      if (produtoEncontrado.produto_imagem) {
        await excluirImagem(produtoEncontrado.produto_imagem);
      }

      const upload = await uploadImagem(
        `produtos/${produtoEncontrado.id}/${originalname}`,
        buffer,
        mimetype
      )

      const produto = await knex("produtos")
        .where("id", "=", id)
        .update({
          descricao,
          quantidade_estoque,
          valor,
          categoria_id,
          produto_imagem: upload.url
        }).returning(['descricao', 'quantidade_estoque', 'valor', 'categoria_id', 'produto_imagem']);

      return res.status(200).json(produto);
    } else {
      const produto = await knex("produtos")
        .where("id", "=", id)
        .update({
          descricao,
          quantidade_estoque,
          valor,
          categoria_id
        }).returning(['descricao', 'quantidade_estoque', 'valor', 'categoria_id', 'produto_imagem']);

      return res.status(200).json(produto);
    };

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
};

const deletarProdutoId = async (req, res) => {
  const { id } = req.params;

  try {
    const pedidoEncontrado = await knex("pedido_produtos").where("produto_id", "=", id)

    if (pedidoEncontrado.length > 0) {
      return res.status(404).json({ mensagem: 'Produto não pode ser excluido' })
    }
    const produtoEncontrado = await knex('produtos').where({ id }).first();

    if (!produtoEncontrado) {
      return res.status(404).json('Produto não encontrado');
    }

    if (produtoEncontrado.produto_imagem !== null) {
      await excluirImagem(produtoEncontrado.produto_imagem)
    };

    const produto = await knex("produtos").where({ id }).del();

    if (!produto) {
      return res.status(400).json('A exclusão do produto não foi efetivada');
    }

    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
};

module.exports = {
  cadastrarProdutos,
  editarDadosProduto,
  deletarProdutoId,
  listarProdutos,
  detalharProduto
};
