require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // 1. Verificamos la conexión a la base de datos
        await sequelize.authenticate();
        console.log('✅ Conexión a PostgreSQL establecida.');

        // 2. Sincronizamos los modelos (sin borrar datos: alter: true)
        await sequelize.sync({ alter: true });
        console.log('✅ Modelos sincronizados con la base de datos.');

        // 3. Arrancamos el servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            console.log(`📖 Documentación disponible en http://localhost:${PORT}/api-docs (próximamente)`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
}

startServer();
