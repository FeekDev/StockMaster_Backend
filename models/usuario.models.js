// Extraemos los tipos de datos de Sequelize y la instancia de conexión a la base de datos
const { DataTypes } = require('sequelize');
// Importamos la instancia de conexión a la base de datos
const sequelize = require('../config/database');
const TipoPersona = require('./tipoPersona.models');
// Definimos el modelo de Usuario con sus campos y tipos de datos
const Persona = sequelize.define('Persona', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    id_tipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TipoPersona, // Nombre del modelo al que se refiere la clave foránea
            key: 'id_tipo'// Campo del modelo TipoPersona que se relaciona con id_tipo_usuario
        },
    },
});

// Exportamos el modelo
module.exports = Persona;