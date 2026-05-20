const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');
const TipoPersona = require('./tipoPersona.models'); // Para la relación

const Persona = sequelize.define('Persona', {
    id_persona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),  // Ajustado a 100 para coincidir con BD si es necesario
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
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    id_tipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Relación con TipoPersona (Clave foránea)
        references: {
            model: TipoPersona, 
            key: 'id_tipo'
        }
    }
}, {
    tableName: 'Persona',           // Nombre exacto de tu tabla en SQL Server
    freezeTableName: true,          // Evita que Sequelize pluralice el nombre
    timestamps: false,              // Tu tabla no tiene createdAt/updatedAt
    // Scope por defecto: nunca devuelve la contraseña en consultas normales
    defaultScope: {
        attributes: { exclude: ['contrasena'] }
    },
    // Scope explícito: para cuando SÍ necesitamos la contraseña (ej: login)
    scopes: {
        conContrasena: { attributes: {} }
    }
});

// ============================================================================
// LÓGICA DE SEGURIDAD (Bcrypt) - Se mantiene intacta
// ============================================================================

// Método para comparar contraseñas (usado en el login)
Persona.prototype.validarContrasena = async function(passwordPlano) {
    return await bcrypt.compare(passwordPlano, this.contrasena);
};

// Hook: Encriptar contraseña ANTES de crear un nuevo registro
Persona.addHook('beforeCreate', async (persona) => {
    if (persona.contrasena) {
        const salt = await bcrypt.genSalt(10);
        persona.contrasena = await bcrypt.hash(persona.contrasena, salt);
    }
});

// Hook: Encriptar contraseña ANTES de actualizar (solo si cambió)
Persona.addHook('beforeUpdate', async (persona) => {
    if (persona.contrasena && persona.changed('contrasena')) {
        const salt = await bcrypt.genSalt(10);
        persona.contrasena = await bcrypt.hash(persona.contrasena, salt);
    }
});

module.exports = Persona;