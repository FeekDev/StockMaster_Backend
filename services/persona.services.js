
//Se export el modelo de persona para usarlo en el controlador
const Persona = require('../models/persona.models');
exports.getAll = async () => {
    return await Persona.findAll();
};

exports.getById = async (id) => {
    return await Persona.findByPk(id);
};

exports.create = async (data) => {
    return await Persona.create(data);
};

exports.update = async (id, data) => {
    const persona = await Persona.findByPk(id);
    if (!persona) return null;

    return await persona.update(data);
};

exports.delete = async (id) => {
    const persona = await Persona.findByPk(id);
    if (!persona) return null;

    await persona.destroy();
};
