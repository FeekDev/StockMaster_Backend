const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Persona', {
  id_persona: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: { notEmpty: { msg: 'El usuario es requerido' } }
  },
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: { notEmpty: { msg: 'La contraseña es requerida' } }
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  id_tipo: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Persona',
  freezeTableName: true,
  timestamps: false, // Tu tabla no tiene campos de auditoría
  defaultScope: {
    attributes: { exclude: ['contrasena'] }
  },
  scopes: {
    conContrasena: { attributes: {} }
  }
});

// Método para comparar contraseñas
Usuario.prototype.validarContrasena = async function(passwordPlano) {
  return await bcrypt.compare(passwordPlano, this.contrasena);
};

// Encriptar antes de crear
Usuario.addHook('beforeCreate', async (usuario) => {
  if (usuario.contrasena) {
    const salt = await bcrypt.genSalt(10);
    usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
  }
});

// Encriptar antes de actualizar (solo si cambió)
Usuario.addHook('beforeUpdate', async (usuario) => {
  if (usuario.contrasena && usuario.changed('contrasena')) {
    const salt = await bcrypt.genSalt(10);
    usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
  }
});

module.exports = Usuario;