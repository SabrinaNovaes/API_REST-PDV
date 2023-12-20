const joi = require('joi');

const schemaCliente = joi.object({
	nome: joi.string().required().messages({
		'any.required': 'O campo nome é obrigatório',
		'string.empty': 'O campo nome é obrigatório'
	}),
	email: joi.string().email().required().messages({
		'string.email': 'O campo email precisa ser um email válido',
		'any.required': 'O campo email é obrigatório',
		'string.empty': 'O campo email é obrigatório'
	}),
	cpf: joi.string().required().min(11).max(11).messages({
		'string.required': 'O campo CPF é obrigatório',
		'string.empty': 'O campo CPF é obrigatório',
		'string.min': 'O campo CPF precisa conter 11 caracteres',
		'string.max': 'O campo CPF precisa conter 11 caracteres',
		'string.base': 'O campo CPF deve conter apenas números'
	}),
	cep: joi.string().min(0).messages({
		'string.min': '',
	}),
	rua: joi.string().min(0).messages({
		'string.min': ''
	}),
	numero: joi.string().min(0).messages({
		'string.min': ''
	}),
	bairro: joi.string().min(0).messages({
		'string.min': ''
	}),
	cidade: joi.string().min(0).messages({
		'string.min': ''
	}),
	estado: joi.string().min(0).messages({
		'string.min': ''
	})
})



module.exports = schemaCliente