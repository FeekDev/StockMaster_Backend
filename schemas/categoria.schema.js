const Joi = require('joi');

const categoriaSchema = {
    create: Joi.object({
        descripcion: Joi.string()
            .max(200)
            .required()
            .messages({
                'string.empty': 'La descripción es requerida',
                'string.max': 'La descripción no puede exceder 200 caracteres',
                'any.required': 'La descripción es requerida'
            })
    }),
    update: Joi.object({
        descripcion: Joi.string()
            .max(200)
            .required()
            .messages({
                'string.empty': 'La descripción es requerida',
                'string.max': 'La descripción no puede exceder 200 caracteres',
                'any.required': 'La descripción es requerida'
            })
    })
};

module.exports = categoriaSchema;
