/**
 * Rutas de Autenticación (Auth Routes)
 * Ubicación: routes/auth.routes.js
 * Descripción: Define los endpoints públicos y privados para autenticación.
 * 
 * Endpoints:
 * - POST /login     -> Inicio de sesión (Público)
 * - POST /register  -> Registro de nuevo usuario (Público)
 * - GET  /me        -> Obtener perfil del usuario (Privado, requiere Token)
 * - GET  /verificar -> Validar token vigente (Privado, requiere Token)
 */

const express = require('express');
const router = express.Router();

// Importamos el controlador
const authController = require('../controller/auth.controllers');

// Importamos el middleware de seguridad
const { verificarToken } = require('../middleware/auth.middleware');

// ============================================================================
// RUTAS PÚBLICAS (No requieren estar logueado)
// ============================================================================

/**
 * POST /api/auth/login
 * Procesa el inicio de sesión
 */
router.post('/login', authController.loginValidaciones, authController.login);

/**
 * POST /api/auth/register
 * Registra un nuevo usuario en la tabla Persona
 */
router.post('/register', authController.loginValidaciones, authController.register);

// ============================================================================
// RUTAS PRIVADAS (Requieren Token JWT válido)
// ============================================================================

/**
 * GET /api/auth/me
 * Obtiene el perfil del usuario logueado
 */
router.get('/me', verificarToken, authController.obtenerPerfil);

/**
 * GET /api/auth/verificar
 * Endpoint utilitario para validar si el token sigue vigente
 */
router.get('/verificar', verificarToken, (req, res) => {
    res.json({
        success: true,
        message: 'Token válido',
        usuario: req.usuario
    });
});

// Exportamos el router
module.exports = router;