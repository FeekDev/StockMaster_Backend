const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./categoria.models');

const Articulo = sequelize.define('Articulo', {
    codigo: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL(18, 0),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categoria,
            key: 'id_categoria'
        },
    },
}, {
    tableName: 'Articulo',
    freezeTableName: true,
    timestamps: false
});

module.exports = Articulo;
