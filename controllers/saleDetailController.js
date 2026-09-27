const { SaleDetail, Sale, Product } = require('../models');

// GET /api/sale-details
const getAll = async (req, res) => {
    try {
        const details = await SaleDetail.findAll({
            include: [
                { model: Sale, as: 'sale' },
                { model: Product, as: 'product' }
            ]
        });
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /api/sale-details/:id
const getById = async (req, res) => {
    try {
        const detail = await SaleDetail.findByPk(req.params.id, {
            include: [
                { model: Sale, as: 'sale' },
                { model: Product, as: 'product' }
            ]
        });
        if (!detail) {
            return res.status(404).json({ error: 'Detalle no encontrado' });
        }
        res.status(200).json(detail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST /api/sale-details
const create = async (req, res) => {
    try {
        const { saleId, productId, quantity, price } = req.body;

        if (!saleId || !productId || !quantity || !price) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const sale = await Sale.findByPk(saleId);
        if (!sale) return res.status(400).json({ error: 'La venta no existe' });

        const product = await Product.findByPk(productId);
        if (!product) return res.status(400).json({ error: 'El producto no existe' });

        if (quantity <= 0) {
            return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' });
        }

        const detail = await SaleDetail.create({ saleId, productId, quantity, price });
        res.status(201).json(detail);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// PUT /api/sale-details/:id
const update = async (req, res) => {
    try {
        const detail = await SaleDetail.findByPk(req.params.id);
        if (!detail) {
            return res.status(404).json({ error: 'Detalle no encontrado' });
        }
        await detail.update(req.body);
        res.status(200).json(detail);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE /api/sale-details/:id
const remove = async (req, res) => {
    try {
        const detail = await SaleDetail.findByPk(req.params.id);
        if (!detail) {
            return res.status(404).json({ error: 'Detalle no encontrado' });
        }
        await detail.destroy();
        res.status(200).json({ message: 'Detalle eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAll, getById, create, update, remove };
