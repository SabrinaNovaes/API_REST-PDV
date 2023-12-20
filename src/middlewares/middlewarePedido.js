const knex = require("../connection/conexao");

const {
    selecionarProdutoPorId,
  } = require("../middlewares/middlewareProdutos");

const clientePorId = async (id) => {
  return await knex("clientes").where({ id }).first();
};

const todoPedidoOuPorCliente = async (cliente_id) => {
  try {
    const pedidos = await knex("pedidos")
      .select(
        "pedidos.id as pedidos_id",
        "pedidos.valor_total",
        "pedidos.observacao",
        "pedidos.cliente_id",

        "pedido_produtos.id as pedido_produtos_id",
        "pedido_produtos.quantidade_produto",
        "pedido_produtos.valor_produto",
        "pedido_produtos.pedido_id",
        "pedido_produtos.produto_id"
      )
      .join("pedido_produtos", "pedidos.id", "pedido_produtos.pedido_id")
      .modify(function (queryBuilder) {
        if (cliente_id) {
          queryBuilder.where({ "pedidos.cliente_id": cliente_id });
        }
      });

    if (pedidos.length === 0) {
      return [];

    } else {
      const pedidosFormatados = [
        {
          pedido: {
            id: pedidos[0].pedidos_id,
            valor_total: pedidos[0].valor_total,
            observacao: pedidos[0].observacao,
            cliente_id: pedidos[0].cliente_id,
          },
          pedido_produtos: [],
        },
      ];

      pedidos.forEach((pedidoLinha) => {
        const pedidoEncontrado = pedidosFormatados.find(
          (pedidoFormatado) =>
            pedidoFormatado.pedido.id === pedidoLinha.pedidos_id
        );

        if (!pedidoEncontrado) {
          pedidosFormatados.push({
            pedido: {
              id: pedidoLinha.pedidos_id,
              valor_total: pedidoLinha.valor_total,
              observacao: pedidoLinha.observacao,
              cliente_id: pedidoLinha.cliente_id,
            },
            pedido_produtos: [],
          });
        }


        const pedidoProdutoEncontrado = pedidosFormatados.find(
          (pedidoFormatado) =>
            pedidoFormatado.pedido.id === pedidoLinha.pedidos_id
        );

        if (pedidoLinha.pedido_produtos_id) {
          pedidoProdutoEncontrado.pedido_produtos.push({
            id: pedidoLinha.pedido_produtos_id,
            quantidade_produto: pedidoLinha.quantidade_produto,
            valor_produto: pedidoLinha.valor_produto,
            pedido_id: pedidoLinha.pedido_id,
            produto_id: pedidoLinha.produto_id,
          });
        }
      });

      return pedidosFormatados;
    }

  } catch (error) {
    console.error(error.message);
    throw new Error(error.message, error.status);
  }
};


  const verificarClienteNoBody = async (req, res, next) => {
    const { cliente_id } = req.body;
  
    try {
      const clienteEncontrado = await selecionarClientePorId(cliente_id);
  
      if (!clienteEncontrado) {
        return res.status(404).json({ mensagem: "Esse cliente não existe!" });
      }
  
      req.cliente = {
        nome: clienteEncontrado.nome,
        email: clienteEncontrado.email,
      };
  
      next();
    } catch (error) {
      return res.status(400).json({ mensagem: error.message });
    }
  };

module.exports = {
  clientePorId,
  todoPedidoOuPorCliente,
  verificarClienteNoBody
};