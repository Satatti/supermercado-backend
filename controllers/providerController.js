const { Provider } = require('../models');

// GET /api/providers
const getAll = async (req, res) => {
    try {
        const providers = await Provider.findAll();
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /api/providers/:id
const getById = async (req, res) => {
    try {
        const provider = await Provider.findByPk(req.params.id);
        if (!provider) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        res.status(200).json(provider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST /api/providers
const create = async (req, res) => {
    try {
        const provider = await Provider.create(req.body);
        res.status(201).json(provider);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// PUT /api/providers/:id
const update = async (req, res) => {
    try {
        const provider = await Provider.findByPk(req.params.id);
        if (!provider) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        await provider.update(req.body);
        res.status(200).json(provider);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE /api/providers/:id
const remove = async (req, res) => {
    try {
        const provider = await Provider.findByPk(req.params.id);
        if (!provider) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        await provider.destroy();
        res.status(200).json({ message: 'Proveedor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAll, getById, create, update, remove };
