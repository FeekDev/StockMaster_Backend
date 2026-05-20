/**
 * Controlador de Autenticación (Auth Controller)
 * Ubicación: controller/auth.controller.js
 * Descripción: Maneja las peticiones HTTP relacionadas con login y registro.
 * Valida los datos de entrada y coordina la respuesta usando el servicio de autenticación.
 * 
 * Dependencias:
 * - express-validator: Para validar campos obligatorios.
 * - ../services/auth.services: Contiene la lógica de negocio.
 */

const { body, validationResult } = require('express-validator');
const authService = require('../services/auth.services');

class AuthController {

    /**
     * Validaciones para Login y Registro
     * Campos adaptados a la tabla Persona: usuario, contrasena
     */
    loginValidaciones = [
        body('usuario')
            .trim()
            .notEmpty().withMessage('El usuario es requerido')
            .isLength({ min: 3 }).withMessage('Debe tener al menos 3 caracteres'),
        body('contrasena')
            .notEmpty().withMessage('La contraseña es requerida')
            .isLength({ min: 6 }).withMessage('Debe tener al menos 6 caracteres')
    ];

    /**
     * Maneja el inicio de sesión (Login)
     */
    login = async (req, res) => {
        try {
            // 1. Verificar validaciones
            const errores = validationResult(req);
            if (!errores.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos inválidos',
                    errores: errores.array().map(err => err.msg)
                });
            }

            // 2. Extraer credenciales (nombres adaptados a tu BD)
            const { usuario, contrasena } = req.body;

            // 3. Llamar al servicio para autenticar
            const resultado = await authService.login(usuario, contrasena);

            // 4. Respuesta exitosa
            res.json({
                success: true,
                message: 'Inicio de sesión exitoso',
                data: resultado
            });

        } catch (error) {
            console.error('❌ ERROR EN LOGIN:', error.message);
            
            res.status(401).json({
                success: false,
                message: error.message || 'Credenciales inválidas'
            });
        }
    };

    /**
     * Maneja el registro de nuevos usuarios (Register)
     */
    register = async (req, res) => {
        try {
            // 1. Verificar validaciones
            const errores = validationResult(req);
            if (!errores.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos inválidos',
                    errores: errores.array().map(err => err.msg)
                });
            }

            // 2. Extraer datos del cuerpo (adaptados a tu tabla Persona)
            const { usuario, contrasena, nombre, direccion, id_tipo } = req.body;

            // Validación básica de datos requeridos
            if (!usuario || !contrasena || !nombre || !id_tipo) {
                return res.status(400).json({
                    success: false,
                    message: 'Usuario, contraseña, nombre y tipo son requeridos'
                });
            }

            // 3. Llamar al servicio para registrar
            const nuevaPersona = await authService.register({
                usuario,
                contrasena,
                nombre,
                direccion: direccion || null,
                id_tipo: parseInt(id_tipo)
            });

            // 4. Respuesta exitosa (excluyendo contraseña)
            const { contrasena: _, ...personaData } = nuevaPersona.toJSON();
            
            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: personaData
            });

        } catch (error) {
            // ✅ LOGGING DETALLADO PARA VER EL ERROR REAL DE SEQUELIZE
            console.error('========================================');
            console.error('❌ ERROR COMPLETO DE REGISTRO:');
            console.error('========================================');
            console.error('• Error name:', error.name);
            console.error('• Error message:', error.message);
            console.error('• Error original:', error.original?.message);
            console.error('• Error parent:', error.parent?.message);
            console.error('• Error errors:', JSON.stringify(error.errors, null, 2));
            console.error('• Error stack:', error.stack);
            console.error('========================================');
            
            res.status(400).json({
                success: false,
                message: error.original?.message || error.message || 'Error al registrar'
            });
        }
    };

    /**
     * Obtiene los datos del usuario actualmente logueado
     */
    obtenerPerfil = async (req, res) => {
        try {
            res.json({
                success: true,
                data: req.usuario
            });
        } catch (error) {
            console.error('Error al obtener perfil:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener el perfil'
            });
        }
    };
}

module.exports = new AuthController();