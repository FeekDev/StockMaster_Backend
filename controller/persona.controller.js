const service = require('../services/persona.services');

exports.getAll = async (req, res) => {
    try {
        const data = await service.getAll();
        res.json(data);
    } catch (error) {
        console.error('Error en getAll:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await service.getById(req.params.id);
        res.json(data);
    } catch (error) {
        console.error('Error en getById:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = await service.create(req.body);
        res.json(data);
    } catch (error) {
        console.error('Error en create:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = await service.update(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        console.error('Error en update:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const data = await service.delete(req.params.id);
       res.json({message: 'Persona eliminada', data });
    } catch (error) {
        console.error('Error en delete:', error);
        res.status(500).json({ error: error.message });
    }
};
