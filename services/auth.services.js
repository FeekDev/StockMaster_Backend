const Persona = require('../models/persona.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar nuevo usuario
exports.register = async (userData) => {
    const { nombre, usuario, contrasena, id_tipo, direccion } = userData;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Persona.findOne({ where: { usuario } });
    if (usuarioExistente) {
        const error = new Error('El usuario ya existe');
        error.status = 400;
        throw error;
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const contrasenaBuscada = await bcrypt.hash(contrasena, salt);

    // Crear nuevo usuario
    const nuevoUsuario = await Persona.create({
        nombre,
        usuario,
        contrasena: contrasenaBuscada,
        id_tipo,
        direccion
    });

    // Generar token JWT
    const token = jwt.sign(
        { id_persona: nuevoUsuario.id_persona, usuario: nuevoUsuario.usuario },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );

    return {
        message: 'Usuario registrado exitosamente',
        token,
        usuario: {
            id_persona: nuevoUsuario.id_persona,
            nombre: nuevoUsuario.nombre,
            usuario: nuevoUsuario.usuario
        }
    };
};

// Login de usuario
exports.login = async (usuario, contrasena) => {
    // Buscar usuario
    const usuarioEncontrado = await Persona.findOne({ where: { usuario } });
    if (!usuarioEncontrado) {
        const error = new Error('Usuario o contraseña incorrectos');
        error.status = 401;
        throw error;
    }

    // Comparar contraseña
    const contrasenaBuscada = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);
    if (!contrasenaBuscada) {
        const error = new Error('Usuario o contraseña incorrectos');
        error.status = 401;
        throw error;
    }

    // Generar token JWT
    const token = jwt.sign(
        { id_persona: usuarioEncontrado.id_persona, usuario: usuarioEncontrado.usuario },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );

    return {
        message: 'Login exitoso',
        token,
        usuario: {
            id_persona: usuarioEncontrado.id_persona,
            nombre: usuarioEncontrado.nombre,
            usuario: usuarioEncontrado.usuario
        }
    };
};

// Verificar y decodificar token
exports.verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            const tokenError = new Error('Token expirado');
            tokenError.status = 401;
            throw tokenError;
        }
        const tokenError = new Error('Token inválido');
        tokenError.status = 401;
        throw tokenError;
    }
};
