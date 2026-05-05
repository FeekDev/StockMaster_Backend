//Se export el modelo de categoria para usarlo en el controlador
const Categoria = require('../models/categoria.models');

exports.getAll = async () => {
    return await Categoria.findAll();
};

exports.getById = async (id) => {
    return await Categoria.findByPk(id);
};

exports.create = async (data) => {
    return await Categoria.create(data);
};

exports.update = async (id, data) => {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) return null;

    return await categoria.update(data);
};

exports.delete = async (id) => {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) return null;

    await categoria.destroy();
};
