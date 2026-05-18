/**
 * Modelo de Usuario - Gestión de autenticación y control de accesos
 * Ubicación: models/usuario.models.js
 * Descripción: Define el esquema de la tabla 'Usuarios' en la base de datos MSSQL.
 * Gestiona credenciales, roles y estados de cuenta. Las contraseñas se almacenan
 * hasheadas utilizando bcrypt para garantizar la seguridad de la información.
 */

const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Identificador único del usuario'
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: 'El nombre de usuario es obligatorio' },
            len: { args: [3, 50], msg: 'Debe tener entre 3 y 50 caracteres' }
        },
        comment: 'Nombre de usuario para inicio de sesión'
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'La contraseña es obligatoria' },
            len: { args: [6, 255], msg: 'Debe tener al menos 6 caracteres' }
        },
        comment: 'Contraseña hasheada con bcrypt'
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: { msg: 'Formato de correo inválido' } },
        comment: 'Correo electrónico institucional o personal'
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { notEmpty: { msg: 'El nombre completo es obligatorio' } },
        comment: 'Nombre completo del usuario para visualización'
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: 'Estado de la cuenta (Activo/Inactivo)'
    },
    rol: {
        type: DataTypes.ENUM('admin', 'vendedor', 'almacen'),
        defaultValue: 'vendedor',
        allowNull: false,
        comment: 'Rol asignado para control de permisos'
    }
}, {
    tableName: 'Usuarios',
    freezeTableName: true,
    timestamps: true,
    underscored: false,
    defaultScope: {
        attributes: { exclude: ['password'] }
    },
    scopes: {
        conPassword: { attributes: {} }
    },
    comment: 'Tabla principal para gestión de autenticación y perfiles'
});

/**
 * Método de instancia para comparar contraseñas
 * @param {string} passwordPlano - Contraseña proporcionada por el usuario
 * @returns {Promise<boolean>} Resultado de la comparación
 */
Usuario.prototype.validarPassword = async function(passwordPlano) {
    return await bcrypt.compare(passwordPlano, this.password);
};

/**
 * Hook: beforeCreate
 * Hashea la contraseña automáticamente antes de insertar un nuevo registro
 */
Usuario.addHook('beforeCreate', async (usuario) => {
    if (usuario.password) {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
    }
});

/**
 * Hook: beforeUpdate
 * Hashea la contraseña únicamente si se detecta una modificación en el campo
 */
Usuario.addHook('beforeUpdate', async (usuario) => {
    if (usuario.password && usuario.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
    }
});

module.exports = Usuario;