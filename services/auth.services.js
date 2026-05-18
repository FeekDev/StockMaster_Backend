/**
 * Servicio de Autenticación (Auth Service)
 * Ubicación: services/auth.services.js
 * Descripción: Encapsula la lógica de negocio para la autenticación.
 * Maneja el inicio de sesión, validación de credenciales y generación/verificación de tokens JWT.
 * 
 * Dependencias:
 * - jsonwebtoken: Para crear y validar los tokens de seguridad.
 * - ../models/usuario.models: Para acceder a la base de datos.
 */

const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.models'); // Importa el modelo creado en el paso anterior

class AuthService {

    /**
     * Genera un token JWT firmado con la clave secreta del entorno.
     * El token contiene la información básica del usuario (payload) y expira en 24 horas.
     * 
     * @param {Object} usuario - Objeto del usuario autenticado
     * @returns {String} - Token JWT string
     */
    generarToken(usuario) {
        const payload = {
            id: usuario.id,
            username: usuario.username,
            rol: usuario.rol || 'vendedor' // Asigna rol por defecto si no existe
        };

        // Firma el token usando la variable de entorno JWT_SECRET
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h' // El token es válido por 24 horas
        });
    }

    /**
     * Lógica principal de Login.
     * Busca el usuario, verifica la contraseña hasheada y genera el token.
     * 
     * @param {String} username - Nombre de usuario ingresado
     * @param {String} password - Contraseña ingresada (en texto plano)
     * @returns {Object} - Objeto con el token y los datos del usuario
     * @throws {Error} - Lanza error si las credenciales son inválidas
     */
    async login(username, password) {
        // 1. Buscar el usuario en BD incluyendo el campo 'password' (usando el scope)
        // Solo busca usuarios activos
        const usuario = await Usuario.scope('conPassword').findOne({
            where: {
                username: username,
                activo: true
            }
        });

        // Si no existe el usuario, lanzamos error genérico por seguridad
        if (!usuario) {
            throw new Error('Credenciales inválidas');
        }

        // 2. Verificar la contraseña usando el método del modelo (bcrypt.compare)
        const esPasswordValido = await usuario.validarPassword(password);

        if (!esPasswordValido) {
            throw new Error('Credenciales inválidas');
        }

        // 3. Si es válido, generamos el token
        const token = this.generarToken(usuario);

        // 4. Preparamos la respuesta excluyendo la contraseña
        const { password: _, ...usuarioData } = usuario.toJSON();

        return {
            token: token,
            usuario: usuarioData
        };
    }

    /**
     * Verifica si un token JWT es válido y no ha expirado.
     * 
     * @param {String} token - Token JWT a verificar
     * @returns {Object} - Payload decodificado (datos del usuario)
     * @throws {Error} - Lanza error si el token es inválido
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

// Exportamos una instancia única del servicio (Singleton)
module.exports = new AuthService();