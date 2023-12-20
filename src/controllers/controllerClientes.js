const knex = require('../connection/conexao')

const listarClientes = async (req, res) => {
  try {
    const clientes = await knex('clientes')
    return res.status(200).json(clientes)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

const detalharCliente = async (req, res) => {
  const { id } = req.params

  try {
    const clienteEncontrado = await knex('clientes').where({ id }).first()

    if (!clienteEncontrado) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' })
    }

    return res.status(200).json(clienteEncontrado)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

  try {
    const emailCliente = await knex('clientes')
      .where({ email: email });

    if (emailCliente.length > 0) {
      return res.status(400).json({ message: "Email já existe." });
    }

    const cpfCliente = await knex('clientes')
      .where({ cpf: cpf });

    if (cpfCliente.length > 0) {
      return res.status(400).json({ message: "CPF já existe." });
    }

    const incluirCliente = await knex("clientes").insert({
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado
    }).returning("*");

    return res.status(201).json(incluirCliente[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
}

const atualizarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
  const { id } = req.params;

  try {
    const clienteEncontrado = await knex('clientes').where({ id }).first()

    if (!clienteEncontrado) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' })
    }

    const verEmailExiste = await knex.raw(`select * from clientes 
      where id != ${id} and email = '${email}'`);

    if (verEmailExiste.rowCount > 0) {
      return res.status(400).json({ mensagem: "Email já existe." });
    }

    const verCpfExiste = await knex.raw(`select * from clientes 
      where id != ${id} and cpf = '${cpf}'`);

    if (verCpfExiste.rowCount > 0) {
      return res.status(400).json({ mensagem: "CPF já existe." });
    }

    const clienteAtualiza = await knex("clientes")
      .where({ id })
      .update({
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado
      }).returning('*');

    return res.status(200).json(clienteAtualiza[0])
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  listarClientes,
  detalharCliente,
  cadastrarCliente,
  atualizarCliente
}