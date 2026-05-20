const jwt = require('jsonwebtoken');

// Middleware para verificar JWT
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            const error = new Error('Token no proporcionado');
            error.status = 401;
            throw error;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            error.status = 401;
            error.message = 'Token expirado';
        } else if (error.name === 'JsonWebTokenError') {
            error.status = 401;
            error.message = 'Token inválido';
        }
        next(error);
    }
};

module.exports = { verifyToken };
