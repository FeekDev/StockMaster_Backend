//Se export el modelo de tipoPersona para usarlo en el controlador
const TipoPersona = require('../models/tipoPersona.models');

exports.getAll = async () => {
    return await TipoPersona.findAll();
};

exports.getById = async (id) => {
    return await TipoPersona.findByPk(id);
};

exports.create = async (data) => {
    return await TipoPersona.create(data);
};

exports.update = async (id, data) => {
    const tipoPersona = await TipoPersona.findByPk(id);
    if (!tipoPersona) return null;

    return await tipoPersona.update(data);
};

exports.delete = async (id) => {
    const tipoPersona = await TipoPersona.findByPk(id);
    if (!tipoPersona) return null;

    await tipoPersona.destroy();
};
