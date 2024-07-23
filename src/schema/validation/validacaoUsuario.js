import Joi from "joi";

export const validacaoUsuario = Joi.object({
    nome: Joi.string().trim().required().messages({
        'string.base': `"nome" deve ser do tipo 'texto'`,
        'string.empty': `"nome" não pode ser vazio`,
        'any.required': `"nome" é um campo obrigatório`
    }),
    sobrenome: Joi.string().trim().required().messages({
        'string.base': `"sobrenome" deve ser do tipo 'texto'`,
        'string.empty': `"sobrenome" não pode ser vazio`,
        'any.required': `"sobrenome" é um campo obrigatório`
    }),
    email: Joi.string().email().lowercase().required().messages({
        'string.email': `"email" deve ser um e-mail válido`,
        'string.empty': `"email" não pode ser vazio`,
        'any.required': `"email" é um campo obrigatório`
    }),
    cpf: Joi.string().trim().required().messages({
        'string.base': `"cpf" deve ser do tipo 'texto'`,
        'string.empty': `"cpf" não pode ser vazio`,
        'any.required': `"cpf" é um campo obrigatório`
    }),
    telefone: Joi.string().trim().required().messages({
        'string.base': `"telefone" deve ser do tipo 'texto'`,
        'string.empty': `"telefone" não pode ser vazio`,
        'any.required': `"telefone" é um campo obrigatório`
    }),
    senha: Joi.string().required().messages({
        'string.empty': `"senha" não pode ser vazio`,
        'any.required': `"senha" é um campo obrigatório`
    }),
    confirmSenha: Joi.string().required().valid(Joi.ref('senha')).messages({
        'any.only': 'A confirmação de senha deve corresponder à senha',
        'any.required': 'A confirmação de senha é obrigatória'
    })
})