// Wrapper para capturar errores en funciones async
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const errorMiddleware = (err, req, res, next) => {
    console.log('Error capturado por el middleware de errores:', err.message);
    console.error(err.stack);

    const status = err.status || 500;
    res.status(status).json({
        message: err.message || 'Error interno del servidor',
    });
}

module.exports = { errorMiddleware, asyncHandler };