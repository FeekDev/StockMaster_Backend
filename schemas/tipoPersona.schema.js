const Joi = require('joi');

const tipoPersonaSchema = {
    create: Joi.object({
        rol: Joi.string()
            .max(50)
            .required()
            .messages({
                'string.empty': 'El rol es requerido',
                'string.max': 'El rol no puede exceder 50 caracteres',
                'any.required': 'El rol es requerido'
            }),
        descripcion: Joi.string()
            .max(200)
            .allow(null, '')
            .messages({
                'string.max': 'La descripción no puede exceder 200 caracteres',
                'string.base': 'La descripción debe ser un texto'
            })
    }),
    update: Joi.object({
        rol: Joi.string()
            .max(50)
            .required()
            .messages({
                'string.empty': 'El rol es requerido',
                'string.max': 'El rol no puede exceder 50 caracteres',
                'any.required': 'El rol es requerido'
            }),
        descripcion: Joi.string()
            .max(200)
            .allow(null, '')
            .messages({
                'string.max': 'La descripción no puede exceder 200 caracteres',
                'string.base': 'La descripción debe ser un texto'
            })
    }).min(1)
};

module.exports = tipoPersonaSchema;
