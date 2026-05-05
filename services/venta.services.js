//Se export el modelo de venta para usarlo en el controlador
const Venta = require('../models/venta.models');

exports.getAll = async () => {
    return await Venta.findAll();
};

exports.getById = async (id) => {
    return await Venta.findByPk(id);
};

exports.create = async (data) => {
    return await Venta.create(data);
};

exports.update = async (id, data) => {
    const venta = await Venta.findByPk(id);
    if (!venta) return null;

    return await venta.update(data);
};

exports.delete = async (id) => {
    const venta = await Venta.findByPk(id);
    if (!venta) return null;

    await venta.destroy();
};
