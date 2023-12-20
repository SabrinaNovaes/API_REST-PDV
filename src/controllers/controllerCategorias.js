const knex = require('../connection/conexao');

const listarCategoria = async (req, res) => {
    try {
        const listaCategorias = await knex('categorias');

        return res.status(200).json(listaCategorias)
    } catch (error) {
        return res.status(500).json({messagem: "Erro interno do servidor"});
    }
};

module.exports = listarCategoria;