const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('STOCKMASTERbdv4', 'sa', 'Yeffer1234', {
  host: 'localhost',
  port: 1433,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  }
});

module.exports = sequelize;