const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Persona = require('./persona.models');

const Venta = sequelize.define('Venta', {
    id_venta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    descuento: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 100
        }
    },
    total: {
        type: DataTypes.DECIMAL(18, 0),
        allowNull: false,
        defaultValue: 0,
    },
    id_persona: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Persona,
            key: 'id_persona'
        },
    },
}, {
    tableName: 'Venta',
    freezeTableName: true,
    timestamps: false
});

module.exports = Venta;
