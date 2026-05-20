/**
 * Servicio de Autenticación (Auth Service)
 * Ubicación: services/auth.services.js
 * Descripción: Encapsula la lógica de negocio para la autenticación.
 * 
 * Dependencias:
 * - jsonwebtoken: Para crear y validar tokens JWT.
 * - bcryptjs: Para encriptar/validar contraseñas.
 * - ../models/usuario.models: Modelo Persona para acceder a la BD.
 */

<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.models');
=======

// URL base del backend (Asegúrate de que coincida con donde corre tu compañero)
const API_URL = 'http://localhost:3000/api';
>>>>>>> a7d0a9d9409b23b6841b4bb442147868f73a6d19

class AuthService {

    /**
     * Genera un token JWT firmado con la clave secreta del entorno.
     */
    generarToken(persona) {
        const payload = {
            id_persona: persona.id_persona,
            usuario: persona.usuario,
            id_tipo: persona.id_tipo || 2
        };

        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });
    }

    /**
     * Lógica principal de Login.
     */
    async login(usuario, contrasena) {
        // Buscar incluyendo la contraseña (usando el scope)
        const persona = await Usuario.scope('conContrasena').findOne({
            where: { usuario: usuario }
        });

        if (!persona) {
            throw new Error('Credenciales inválidas');
        }

        // Verificar contraseña
        const esValida = await persona.validarContrasena(contrasena);
        if (!esValida) {
            throw new Error('Credenciales inválidas');
        }

        // Generar token
        const token = this.generarToken(persona);

        // Excluir contraseña de la respuesta
        const { contrasena: _, ...personaData } = persona.toJSON();

        return {
            token: token,
            usuario: personaData
        };
    }

    /**
     * Registra un nuevo usuario en la tabla Persona
     * ⚠️ IMPORTANTE: NO hacemos try-catch aquí para que los errores de Sequelize
     * (clave foránea, único, etc.) se propaguen completos al controlador.
     */
    async registrarPersona(datosPersona) {
        // 1. Verificar si el usuario ya existe
        const personaExistente = await Usuario.findOne({ 
            where: { usuario: datosPersona.usuario } 
        });
        
        if (personaExistente) {
            // ✅ Usar new Error() para que tenga stack trace
            throw new Error('El nombre de usuario ya está en uso');
        }

        // 2. Crear la persona
        // Si hay error de BD (clave foránea, validación, etc.), Sequelize lo lanzará
        // y llegará completo al controlador
        const nuevaPersona = await Usuario.create(datosPersona);
        
        return nuevaPersona; 
    }

    /**
     * Verifica si un token JWT es válido y no ha expirado.
     */
    verificarToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (error) {
            throw new Error('Token inválido o expirado');
        }
    }
}

<<<<<<< HEAD
// Exportamos una instancia única (Singleton)
=======
>>>>>>> a7d0a9d9409b23b6841b4bb442147868f73a6d19
module.exports = new AuthService();