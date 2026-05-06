const Joi = require('joi');

const personaSchema = {
    create: Joi.object({
        nombre: Joi.string()
            .required()
            .messages({
                'string.empty': 'El nombre es requerido',
                'any.required': 'El nombre es requerido'
            }),
        usuario: Joi.string()
            .required()
            .messages({
                'string.empty': 'El usuario es requerido',
                'any.required': 'El usuario es requerido'
            }),
        contrasena: Joi.string()
            .required()
            .messages({
                'string.empty': 'La contraseña es requerida',
                'any.required': 'La contraseña es requerida'
            }),
        direccion: Joi.string()
            .allow(null, '')
            .messages({
                'string.base': 'La dirección debe ser un texto'
            }),
        id_tipo: Joi.number()
            .integer()
            .required()
            .messages({
                'number.base': 'El id_tipo debe ser un número',
                'number.integer': 'El id_tipo debe ser un número entero',
                'any.required': 'El id_tipo es requerido'
            })
    }),
    update: Joi.object({
        nombre: Joi.string()
            .messages({
                'string.empty': 'El nombre no puede estar vacío'
            }),
        usuario: Joi.string()
            .messages({
                'string.empty': 'El usuario no puede estar vacío'
            }),
        contrasena: Joi.string()
            .messages({
                'string.empty': 'La contraseña no puede estar vacía'
            }),
        direccion: Joi.string()
            .allow(null, '')
            .messages({
                'string.base': 'La dirección debe ser un texto'
            }),
        id_tipo: Joi.number()
            .integer()
            .messages({
                'number.base': 'El id_tipo debe ser un número',
                'number.integer': 'El id_tipo debe ser un número entero'
            })
    }).min(1)
};

module.exports = personaSchema;
