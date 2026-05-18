/**
 * Rutas de Autenticación (Auth Routes)
 * Ubicación: routes/auth.routes.js
 * Descripción: Define los endpoints públicos y privados para la autenticación.
 * 
 * Este archivo actúa como el puente entre la petición HTTP y la lógica del Controlador.
 * Aquí se determina qué ruta es accesible libremente y cuál requiere un Token válido.
 * 
 * Endpoints definidos:
 * - POST   /login          -> Ingreso de credenciales (Público).
 * - GET    /me             -> Obtiene datos del usuario actual (Privado, requiere Token).
 * - GET    /verificar      -> Valida si el token actual sigue siendo válido (Privado, requiere Token).
 */

const express = require('express');
const router = express.Router();

// Importamos el controlador que tiene la lógica de negocio
const authController = require('../controller/auth.controller');

// Importamos el middleware de seguridad (El guardia que revisa el token)
const { verificarToken } = require('../middleware/auth.middleware');

// ============================================================================
// RUTAS PÚBLICAS (No requieren estar logueado)
// ============================================================================

/**
 * POST /api/auth/login
 * Procesa el inicio de sesión.
 * Orden de ejecución:
 * 1. authController.loginValidaciones: Verifica que username y password existan y tengan formato correcto.
 * 2. authController.login: Si pasa la validación, ejecuta el login contra la base de datos.
 */
router.post('/login', authController.loginValidaciones, authController.login);

// ============================================================================
// RUTAS PRIVADAS (Requieren Token JWT válido)
// ============================================================================

/**
 * GET /api/auth/me
 * Obtiene el perfil del usuario que está logueado.
 * Orden de ejecución:
 * 1. verificarToken: Primero pasa por el guardia. Si no hay token o es inválido, bloquea el acceso (401).
 * 2. authController.obtenerPerfil: Si el token es válido, devuelve los datos del usuario (inyectados en req.usuario).
 */
router.get('/me', verificarToken, authController.obtenerPerfil);

/**
 * GET /api/auth/verificar
 * Endpoint utilitario para que el Frontend pregunte: "¿Sigo logueado?".
 * Si llega aquí, significa que el token sigue vigente.
 */
router.get('/verificar', verificarToken, (req, res) => {
    res.json({
        success: true,
        message: 'Token válido',
        usuario: req.usuario
    });
});

// Exportamos el router para ser conectado en el archivo principal (app.js)
module.exports = router;
