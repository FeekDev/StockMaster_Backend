const authService = require('../services/auth.services');

exports.register = async (req, res, next) => {
    try {
        const data = await authService.register(req.body);
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { usuario, contrasena } = req.body;

        if (!usuario || !contrasena) {
            const error = new Error('Usuario y contraseña son requeridos');
            error.status = 400;
            throw error;
        }

        const data = await authService.login(usuario, contrasena);
        res.json(data);
    } catch (error) {
        next(error);
    }
};
