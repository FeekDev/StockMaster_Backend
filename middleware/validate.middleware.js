const validate = (schema) => (req, res, next) => {
    console.log('Validando datos de entrada...');
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: 'Datos no válidos',
            details: error.details.map(detail => detail.message)
        });
    }
    next();
}

module.exports = validate;