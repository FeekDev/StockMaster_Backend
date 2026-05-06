const Joi = require('joi');

const articuloSchema = {
    create: Joi.object({
        codigo: Joi.string()
            .max(50)
            .required()
            .messages({
                'string.empty': 'El código es requerido',
                'string.max': 'El código no puede exceder 30 caracteres',
                'any.required': 'El código es requerido'
            }),
        nombre: Joi.string()
            .max(150)
            .required()
            .messages({
                'string.empty': 'El nombre es requerido',
                'string.max': 'El nombre no puede exceder 150 caracteres',
                'any.required': 'El nombre es requerido'
            }),
        precio: Joi.number()
            .positive()
            .required()
            .messages({
                'number.positive': 'El precio debe ser mayor a 0',
                'number.base': 'El precio debe ser un número',
                'any.required': 'El precio es requerido'
            }),
        stock: Joi.number()
            .integer()
            .min(0)
            .default(0)
            .messages({
                'number.integer': 'El stock debe ser un número entero',
                'number.min': 'El stock no puede ser negativo'
            }),
        id_categoria: Joi.number()
            .integer()
            .required()
            .messages({
                'number.base': 'El id_categoria debe ser un número',
                'number.integer': 'El id_categoria debe ser un número entero',
                'any.required': 'El id_categoria es requerido'
            })
    }),
    update: Joi.object({
        nombre: Joi.string()
            .max(150)
            .messages({
                'string.max': 'El nombre no puede exceder 150 caracteres'
            }),
        precio: Joi.number()
            .positive()
            .messages({
                'number.positive': 'El precio debe ser mayor a 0',
                'number.base': 'El precio debe ser un número'
            }),
        stock: Joi.number()
            .integer()
            .min(0)
            .messages({
                'number.integer': 'El stock debe ser un número entero',
                'number.min': 'El stock no puede ser negativo'
            }),
        id_categoria: Joi.number()
            .integer()
            .messages({
                'number.base': 'El id_categoria debe ser un número',
                'number.integer': 'El id_categoria debe ser un número entero'
            })
    }).min(1)
};

module.exports = articuloSchema;
