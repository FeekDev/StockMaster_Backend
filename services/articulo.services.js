//Se export el modelo de articulo para usarlo en el controlador
const Articulo = require('../models/articulo.models');

exports.getAll = async () => {
    return await Articulo.findAll();
};

exports.getById = async (id) => {
    return await Articulo.findByPk(id);
};

exports.create = async (data) => {
    return await Articulo.create(data);
};

exports.update = async (id, data) => {
    const articulo = await Articulo.findByPk(id);
    if (!articulo) return null;

    return await articulo.update(data);
};

exports.delete = async (id) => {
    const articulo = await Articulo.findByPk(id);
    if (!articulo) return null;

    await articulo.destroy();
};
