const joi = require('joi');

const loginSchema = joi.object({
	email: joi.string().email().required().messages({
		'any.required': 'O email é obrigátorio',
		'string.empty': 'O email é obrigátorio',
		'string.email': 'O email precisa ser um email válido'
	}),

	senha: joi.string().required().min(5).messages({
		'any.required': 'A senha é obrigátoria',
		'string.empty': 'A senha é obrigátoria',
		'string.min': 'A senha deve ter pelo menos 8 caracteres'
	})
})


module.exports = loginSchema