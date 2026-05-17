require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/database');


// Importar modelos
const Persona = require('./models/persona.models');
const TipoPersona = require('./models/tipoPersona.models');
const Venta = require('./models/venta.models');
const Articulo = require('./models/articulo.models');
const Categoria = require('./models/categoria.models');
const DetalleFactura = require('./models/detalleFactura.models');

// Importar rutas
const personaRoutes = require('./routes/persona.routes');
const tipoPersonaRoutes = require('./routes/tipoPersona.routes');
const articuloRoutes = require('./routes/articulo.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const detalleFacturaRoutes = require('./routes/detalleFactura.routes');
const ventaRoutes = require('./routes/venta.routes');
const { errorMiddleware } = require('./middleware/error.middleware');

// Configurar CORS para permitir todas las solicitudes desde el frontend
const cors = require('cors');
app.use(cors());



// Middlewares
app.use(express.json());

// Health check
app.get('/health', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({ status: 'OK', database: 'Connected' });
    } catch (error) {
        res.status(500).json({ status: 'ERROR', error: error.message });
    }
});

// Usar rutas
app.use('/personas', personaRoutes);
app.use('/tiposPersona', tipoPersonaRoutes);
app.use('/articulos', articuloRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/detalleFacturas', detalleFacturaRoutes);
app.use('/ventas', ventaRoutes);

app.use(errorMiddleware);

// Arrancar servidor
sequelize.sync().then(() => {
    console.log('✅ Database sincronizada');
    app.listen(3000, () => {
        console.log('🚀 Servidor corriendo en http://localhost:3000');
    });
}).catch(error => {
    console.error('❌ Error sincronizando la base de datos:', error);
});