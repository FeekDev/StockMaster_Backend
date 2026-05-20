const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Ruta para registrar nuevo usuario
router.post('/register', authController.register);

// Ruta para login
router.post('/login', authController.login);

// Ruta de prueba protegida (requiere token)
router.get('/profile', verifyToken, (req, res) => {
    res.json({
        message: 'Acceso permitido',
        usuario: req.user
    });
});

module.exports = router;
