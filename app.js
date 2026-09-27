const express = require('express');
const routes = require('./routes');

const app = express();

// ==========================================
// MIDDLEWARES
// ==========================================
app.use(express.json()); // Permite recibir JSON en el body
app.use(express.urlencoded({ extended: true })); // Permite form-urlencoded

// ==========================================
// RUTA DE BIENVENIDA
// ==========================================
app.get('/', (req, res) => {
    res.json({
        message: 'API REST - Supermercado MarketSoft',
        version: '1.0.0',
        endpoints: {
            providers: '/api/providers',
            products: '/api/products',
            users: '/api/users',
            sales: '/api/sales',
            saleDetails: '/api/sale-details'
        }
    });
});

// ==========================================
// RUTAS DE LA API
// ==========================================
app.use('/api', routes);

// ==========================================
// MANEJO DE RUTAS NO ENCONTRADAS (404)
// ==========================================
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// ==========================================
// MANEJO GLOBAL DE ERRORES
// ==========================================
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;
