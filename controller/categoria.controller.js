const service = require('../services/categoria.services');

exports.getAll = async (req, res) => {
    const data = await service.getAll();
    res.json(data);
};

exports.getById = async (req, res) => {
    const data = await service.getById(req.params.id);
    if (!data) return res.status(404).json({ error: 'No encontrado' });
    res.json(data);
};

exports.create = async (req, res) => {
    const data = await service.create(req.body);
    res.status(201).json(data);
};

exports.update = async (req, res) => {
    const data = await service.update(req.params.id, req.body);
    if (!data) return res.status(404).json({ error: 'No encontrado' });
    res.json(data);
};

exports.delete = async (req, res) => {
    const data = await service.delete(req.params.id);
    res.json({ message: 'Eliminado correctamente' });
};
