const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoPersona = sequelize.define('TipoPersona', {
    id_tipo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
}, {
    tableName: 'TipoPersona',
    freezeTableName: true,
    timestamps: false
});

module.exports = TipoPersona;
