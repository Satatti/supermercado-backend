const { Product, Provider } = require('../models');

// GET /api/products (incluye el proveedor)
const getAll = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{ model: Provider, as: 'provider' }]
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /api/products/:id
const getById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{ model: Provider, as: 'provider' }]
        });
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST /api/products
const create = async (req, res) => {
    try {
        const { name, description, price, stock, providerId } = req.body;

        // Validación: precio mayor a 0
        if (price === undefined || price <= 0) {
            return res.status(400).json({ error: 'El precio debe ser mayor a 0' });
        }

        // Validación: stock no negativo
        if (stock === undefined || stock < 0) {
            return res.status(400).json({ error: 'El stock no puede ser negativo' });
        }

        // Validación: el proveedor existe
        const provider = await Provider.findByPk(providerId);
        if (!provider) {
            return res.status(400).json({ error: 'El proveedor no existe' });
        }

        const product = await Product.create({ name, description, price, stock, providerId });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// PUT /api/products/:id
const update = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const { price, stock, providerId } = req.body;

        if (price !== undefined && price <= 0) {
            return res.status(400).json({ error: 'El precio debe ser mayor a 0' });
        }
        if (stock !== undefined && stock < 0) {
            return res.status(400).json({ error: 'El stock no puede ser negativo' });
        }
        if (providerId !== undefined) {
            const provider = await Provider.findByPk(providerId);
            if (!provider) {
                return res.status(400).json({ error: 'El proveedor no existe' });
            }
        }

        await product.update(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE /api/products/:id
const remove = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        await product.destroy();
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAll, getById, create, update, remove };
