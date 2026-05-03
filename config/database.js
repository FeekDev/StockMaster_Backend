// Punto de conexion a la base de datos
const { Sequelize } = require('sequelize');
// Variable de entorno para MSSQL
const DB_TYPE = process.env.DB_TYPE
// Inicialización sequelize
let sequelize
// Conexión a bd
sequelize = new Sequelize('STOCKMASTERbdv4', 'sa', 'SQLS3rv3r*', {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: false
        }
    }
});

module.exports = sequelize