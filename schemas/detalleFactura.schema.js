const Joi = require('joi');

const detalleFacturaSchema = {
    create: Joi.object({
        cantidad: Joi.number()
            .integer()
            .min(1)
            .required()
            .messages({
                'number.base': 'La cantidad debe ser un número',
                'number.integer': 'La cantidad debe ser un número entero',
                'number.min': 'La cantidad debe ser mayor a 0',
                'any.required': 'La cantidad es requerida'
            }),
        precio_unitario: Joi.number()
            .min(0)
            .required()
            .messages({
                'number.base': 'El precio unitario debe ser un número',
                'number.min': 'El precio unitario no puede ser negativo',
                'any.required': 'El precio unitario es requerido'
            }),
        subtotal: Joi.number()
            .min(0)
            .default(0)
            .messages({
                'number.base': 'El subtotal debe ser un número',
                'number.min': 'El subtotal no puede ser negativo'
            }),
        id_venta: Joi.number()
            .integer()
            .required()
            .messages({
                'number.base': 'El id_venta debe ser un número',
                'number.integer': 'El id_venta debe ser un número entero',
                'any.required': 'El id_venta es requerido'
            }),
        codigo_articulo: Joi.string()
            .max(50)
            .required()
            .messages({
                'string.empty': 'El código de artículo es requerido',
                'string.max': 'El código de artículo no puede exceder 50 caracteres',
                'any.required': 'El código de artículo es requerido'
            })
    }),
    update: Joi.object({
        cantidad: Joi.number()
            .integer()
            .min(1)
            .messages({
                'number.base': 'La cantidad debe ser un número',
                'number.integer': 'La cantidad debe ser un número entero',
                'number.min': 'La cantidad debe ser mayor a 0'
            }),
        precio_unitario: Joi.number()
            .min(0)
            .messages({
                'number.base': 'El precio unitario debe ser un número',
                'number.min': 'El precio unitario no puede ser negativo'
            }),
        subtotal: Joi.number()
            .min(0)
            .messages({
                'number.base': 'El subtotal debe ser un número',
                'number.min': 'El subtotal no puede ser negativo'
            }),
        id_venta: Joi.number()
            .integer()
            .messages({
                'number.base': 'El id_venta debe ser un número',
                'number.integer': 'El id_venta debe ser un número entero'
            }),
        codigo_articulo: Joi.string()
            .max(50)
            .messages({
                'string.empty': 'El código de artículo no puede estar vacío',
                'string.max': 'El código de artículo no puede exceder 50 caracteres'
            })
    }).min(1)
};

module.exports = detalleFacturaSchema;
