import Joi from "joi";

export const validacaoLog = Joi.object({

    email: Joi.string().email().required().messages({
        'string.email': 'O email deve ser um email válido',
        'any.required': 'O email é obrigatório'
    }),
    senha: Joi.string().min(8).required().messages({
        'string.min': 'A senha deve ter no mínimo 8 caracteres',
        'any.required': 'A senha é obrigatória'
    })
})
