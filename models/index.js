const sequelize = require('../config/database');

const Provider = require('./provider');
const Product = require('./product');
const User = require('./user');
const Sale = require('./sale');
const SaleDetail = require('./saleDetail');

// ==========================================
// RELACIONES
// ==========================================

// Proveedor -> Productos (1:N)
Provider.hasMany(Product, {
    foreignKey: 'providerId',
        as: 'products',
        onDelete: 'CASCADE'
});
Product.belongsTo(Provider, {
    foreignKey: 'providerId',
        as: 'provider'
});

// Usuario -> Ventas (1:N)
User.hasMany(Sale, {
    foreignKey: 'userId',
        as: 'sales',
        onDelete: 'CASCADE'
});
Sale.belongsTo(User, {
    foreignKey: 'userId',
        as: 'user'
});

// Venta -> DetalleVenta (1:N)
Sale.hasMany(SaleDetail, {
    foreignKey: 'saleId',
        as: 'details',
        onDelete: 'CASCADE'
});
SaleDetail.belongsTo(Sale, {
    foreignKey: 'saleId',
        as: 'sale'
});

// Producto -> DetalleVenta (1:N)
Product.hasMany(SaleDetail, {
    foreignKey: 'productId',
        as: 'saleDetails',
        onDelete: 'CASCADE'
});
SaleDetail.belongsTo(Product, {
    foreignKey: 'productId',
        as: 'product'
});

// Exportamos todo
module.exports = {
    sequelize,
    Provider,
    Product,
    User,
    Sale,
    SaleDetail
};
