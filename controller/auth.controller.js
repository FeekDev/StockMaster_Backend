/**
 * Controlador de Autenticación (Auth Controller)
 * Ubicación: controllers/auth.controller.js
 * Descripción: Maneja las peticiones HTTP relacionadas con el inicio de sesión.
 * Valida los datos de entrada (request) y coordina la respuesta (response)
 * utilizando el servicio de autenticación.
 * 
 * Dependencias:
 * - express-validator: Para validar campos obligatorios antes de procesar.
 * - ../services/auth.services: Contiene la lógica de login y generación de tokens.
 */

const { body, validationResult } = require('express-validator');
const authService = require('../services/auth.services');

class AuthController {

    /**
     * Array de validaciones para el endpoint de Login.
     * Se ejecutan antes de la función login().
     * Si hay errores, se detiene la ejecución y devuelve el error.
     */
    loginValidaciones = [
        body('username')
            .trim()
            .notEmpty().withMessage('El nombre de usuario es requerido')
            .isLength({ min: 3 }).withMessage('El usuario debe tener al menos 3 caracteres'),
        body('password')
            .notEmpty().withMessage('La contraseña es requerida')
            .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    ];

    /**
     * Maneja la petición POST de inicio de sesión.
     * @param {Request} req - Objeto de petición (contiene body con username y password)
     * @param {Response} res - Objeto de respuesta
     */
    login = async (req, res) => {
        try {
            // 1. Verificar si hubo errores en la validación de campos
            const errores = validationResult(req);
            if (!errores.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos de entrada inválidos',
                    errores: errores.array().map(err => err.msg)
                });
            }

            // 2. Extraer credenciales del cuerpo de la petición
            const { username, password } = req.body;

            // 3. Llamar al servicio para autenticar
            // Si las credenciales fallan, el servicio lanzará un error (catch)
            const resultado = await authService.login(username, password);

            // 4. Respuesta exitosa
            res.json({
                success: true,
                message: 'Inicio de sesión exitoso',
                data: resultado // Contiene el token y datos del usuario
            });

        } catch (error) {
            // 5. Manejo de errores (Credenciales inválidas, usuario inactivo, etc.)
            console.error('Error en login:', error.message);
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    };

    /**
     * Endpoint para obtener los datos del usuario actualmente logueado.
     * Requiere que el middleware de autenticación se ejecute antes (ver Paso 5).
     * @param {Request} req - Objeto de petición (debe tener req.usuario gracias al middleware)
     * @param {Response} res - Objeto de respuesta
     */
    obtenerPerfil = async (req, res) => {
        try {
            // req.usuario ya fue inyectado por el middleware auth.middleware.js
            res.json({
                success: true,
                data: req.usuario
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener el perfil del usuario'
            });
        }
    };
}

// Exportamos una instancia del controlador
module.exports = new AuthController();