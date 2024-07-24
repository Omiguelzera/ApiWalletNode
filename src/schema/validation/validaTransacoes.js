import Joi from 'joi';

export const validaTransacoes = Joi.object({
    valor: Joi.number().required().messages({
        'number.base': 'O campo valor deve ser um número.',
        'any.required': 'O campo valor é obrigatório.'
    }),
    descricao: Joi.string().required().messages({
        'string.base': 'O campo descricao deve ser uma string.',
        'any.required': 'O campo descricao é obrigatório.'
    }),
    tipo: Joi.string().required().valid("input", "output").messages({
        'string.base': 'O campo tipo deve ser uma string.',
        'any.required': 'O campo tipo é obrigatório.'
    }),
    usuarioId: Joi.object(),
    createdAt: Joi.date()
});