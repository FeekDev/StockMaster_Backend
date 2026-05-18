/**
 * Middleware de Autenticación
 * Ubicación: middleware/auth.middleware.js
 * Descripción: Interceptor que verifica la validez del Token JWT en cada petición protegida.
 * 
 * Funcionamiento:
 * 1. Intercepta la petición antes de llegar al controlador.
 * 2. Busca el token en el header "Authorization".
 * 3. Verifica si el token es válido y no ha expirado.
 * 4. Si es válido, inyecta la información del usuario en el objeto "req" (req.usuario).
 * 5. Si falla, bloquea el acceso y devuelve un error 401 (No autorizado).
 */

const jwt = require('jsonwebtoken');
const authService = require('../services/auth.services');

/**
 * Middleware principal para validar el token de acceso.
 * Debe incluirse en cualquier ruta que requiera sesión iniciada.
 */
const verificarToken = async (req, res, next) => {
    try {
        // 1. Obtener el header de autorización
        const authHeader = req.headers['authorization'];

        // Verificamos si el header existe
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado. No se proporcionó token de autenticación.'
            });
        }

        // 2. Extraer el token (espera formato "Bearer <token>")
        // Dividimos por espacio y tomamos la segunda parte
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado. Formato de token inválido.'
            });
        }

        // 3. Verificar la validez del token usando nuestro servicio
        // Si el token es falso o expiró, jwt.verify lanzará un error
        const usuarioDecodificado = authService.verificarToken(token);

        // 4. Inyectar los datos del usuario en la petición
        // Así el controlador siguiente podrá saber quién hizo la petición
        req.usuario = usuarioDecodificado;

        // 5. Continuar con el flujo normal
        next();

    } catch (error) {
        // Si hay cualquier error (token expirado, firma inválida, etc.)
        console.error('Error en middleware de auth:', error.message);
        return res.status(401).json({
            success: false,
            message: 'Token inválido o sesión expirada.'
        });
    }
};

// Exportamos el middleware
module.exports = { verificarToken };

