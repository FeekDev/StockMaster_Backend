const service = require('../services/tipoPersona.services');

exports.getAll = async (req, res) => {
    const data = await service.getAll();
    res.json(data);
};

exports.getById = async (req, res) => {
    const data = await service.getById(req.params.id);
    res.json(data);
};

exports.create = async (req, res) => {
    const data = await service.create(req.body);
    res.json(data);
};

exports.update = async (req, res) => {
    const data = await service.update(req.params.id, req.body);
    res.json(data);
};

exports.delete = async (req, res) => {
    const data = await service.delete(req.params.id);
    res.json(data);
};
