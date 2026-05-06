const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Venta = require('./venta.models');
const Articulo = require('./articulo.models');

const DetalleFactura = sequelize.define('DetalleFactura', {
    id_detalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(18, 0),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    subtotal: {
        type: DataTypes.DECIMAL(18, 0),
        allowNull: false,
        defaultValue: 0,
    },
    id_venta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Venta,
            key: 'id_venta'
        },
    },
    codigo_articulo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: Articulo,
            key: 'codigo'
        },
    },
}, {
    tableName: 'DetalleFactura',
    freezeTableName: true,
    timestamps: false
});

module.exports = DetalleFactura;