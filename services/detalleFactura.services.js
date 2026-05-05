//Se export el modelo de detalleFactura para usarlo en el controlador
const DetalleFactura = require('../models/detalleFactura.models');

exports.getAll = async () => {
    return await DetalleFactura.findAll();
};

exports.getById = async (id) => {
    return await DetalleFactura.findByPk(id);
};

exports.create = async (data) => {
    return await DetalleFactura.create(data);
};

exports.update = async (id, data) => {
    const detalleFactura = await DetalleFactura.findByPk(id);
    if (!detalleFactura) return null;

    return await detalleFactura.update(data);
};

exports.delete = async (id) => {
    const detalleFactura = await DetalleFactura.findByPk(id);
    if (!detalleFactura) return null;

    await detalleFactura.destroy();
};
