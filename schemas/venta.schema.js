const Joi = require('joi');

const ventaSchema = {
    create: Joi.object({
        fecha: Joi.date()
            .required()
            .messages({
                'date.base': 'La fecha debe ser una fecha válida',
                'any.required': 'La fecha es requerida'
            }),
        descuento: Joi.number()
            .min(0)
            .max(100)
            .default(0)
            .messages({
                'number.base': 'El descuento debe ser un número',
                'number.min': 'El descuento no puede ser negativo',
                'number.max': 'El descuento no puede exceder 100'
            }),
        total: Joi.number()
            .min(0)
            .default(0)
            .messages({
                'number.base': 'El total debe ser un número',
                'number.min': 'El total no puede ser negativo'
            }),
        id_persona: Joi.number()
            .integer()
            .required()
            .messages({
                'number.base': 'El id_persona debe ser un número',
                'number.integer': 'El id_persona debe ser un número entero',
                'any.required': 'El id_persona es requerido'
            })
    }),
    update: Joi.object({
        fecha: Joi.date()
            .messages({
                'date.base': 'La fecha debe ser una fecha válida'
            }),
        descuento: Joi.number()
            .min(0)
            .max(100)
            .messages({
                'number.base': 'El descuento debe ser un número',
                'number.min': 'El descuento no puede ser negativo',
                'number.max': 'El descuento no puede exceder 100'
            }),
        total: Joi.number()
            .min(0)
            .messages({
                'number.base': 'El total debe ser un número',
                'number.min': 'El total no puede ser negativo'
            }),
        id_persona: Joi.number()
            .integer()
            .messages({
                'number.base': 'El id_persona debe ser un número',
                'number.integer': 'El id_persona debe ser un número entero'
            })
    }).min(1)
};

module.exports = ventaSchema;
