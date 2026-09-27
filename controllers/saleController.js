const { Sale, SaleDetail, Product, User, sequelize } = require('../models');

// GET /api/sales (incluye usuario y detalles)
const getAll = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include: [
                { model: User, as: 'user' },
                { model: SaleDetail, as: 'details', include: [{ model: Product, as: 'product' }] }
            ]
        });
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /api/sales/:id
const getById = async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id, {
            include: [
                { model: User, as: 'user' },
                { model: SaleDetail, as: 'details', include: [{ model: Product, as: 'product' }] }
            ]
        });
        if (!sale) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST /api/sales
// Body esperado: { userId, details: [{ productId, quantity }] }
const create = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { userId, details } = req.body;

        // Validaciones básicas
        if (!userId) {
            await transaction.rollback();
            return res.status(400).json({ error: 'El userId es obligatorio' });
        }
        if (!details || !Array.isArray(details) || details.length === 0) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Debe incluir al menos un detalle' });
        }

        // Validar que el usuario existe
        const user = await User.findByPk(userId, { transaction });
        if (!user) {
            await transaction.rollback();
            return res.status(400).json({ error: 'El usuario no existe' });
        }

        let total = 0;
        const saleDetailsToCreate = [];

        // Procesar cada detalle
        for (const item of details) {
            const product = await Product.findByPk(item.productId, { transaction });
            if (!product) {
                await transaction.rollback();
                return res.status(400).json({ error: `El producto ${item.productId} no existe` });
            }

            if (item.quantity <= 0) {
                await transaction.rollback();
                return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' });
            }

            if (product.stock < item.quantity) {
                await transaction.rollback();
                return res.status(400).json({
                    error: `Stock insuficiente para ${product.name}. Disponible: ${product.stock}`
                });
            }

            // Calcular subtotal
            const subtotal = parseFloat(product.price) * item.quantity;
            total += subtotal;

            // Preparar detalle
            saleDetailsToCreate.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price
            });

            // Descontar stock
            await product.update(
                { stock: product.stock - item.quantity },
                { transaction }
            );
        }

        // Crear la venta con el total calculado automáticamente
        const sale = await Sale.create(
            { userId, date: new Date(), total },
                                       { transaction }
        );

        // Crear los detalles asociados
        for (const detail of saleDetailsToCreate) {
            await SaleDetail.create(
                { ...detail, saleId: sale.id },
                { transaction }
            );
        }

        await transaction.commit();

        // Devolver la venta con sus relaciones
        const completeSale = await Sale.findByPk(sale.id, {
            include: [
                { model: User, as: 'user' },
                { model: SaleDetail, as: 'details', include: [{ model: Product, as: 'product' }] }
            ]
        });

        res.status(201).json(completeSale);
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ error: error.message });
    }
};

// PUT /api/sales/:id → Solo se permite actualizar userId o date
const update = async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id);
        if (!sale) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        // No permitimos editar detalles aquí (por consistencia del total)
        const { userId, date } = req.body;
        await sale.update({ userId, date });
        res.status(200).json(sale);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE /api/sales/:id
const remove = async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id);
        if (!sale) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        await sale.destroy();
        res.status(200).json({ message: 'Venta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAll, getById, create, update, remove };
