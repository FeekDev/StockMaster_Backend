const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categoria = sequelize.define('Categoria', {
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
}, {
    tableName: 'Categoria',
    freezeTableName: true,
    timestamps: false
});

module.exports = Categoria;
