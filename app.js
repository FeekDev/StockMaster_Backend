require('dotenv').config();
const express = require('express');
const cors = require('cors'); // ← NUEVO: Importar CORS
const app = express();
const sequelize = require('./config/database')

// Importar todos los modelos
const Persona = require('./models/persona.models');
const TipoPersona = require('./models/tipoPersona.models');
const Articulo = require('./models/articulo.models');
const Categoria = require('./models/categoria.models');
const DetalleFactura = require('./models/detalleFactura.models');
const Venta = require('./models/venta.models');
const Usuario = require('./models/usuario.models');

app.use(express.json());

// ============================================
// MIDDLEWARE CORS - NUEVO (para permitir frontend)
// ============================================
app.use(cors({
    origin: 'http://localhost:5173', // Permite peticiones desde tu frontend (Vite)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Health check endpoint
app.get('/health', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({ status: 'OK', database: 'Connected' });
    } catch (error) {
        res.status(500).json({ status: 'ERROR', error: error.message });
    }
});

sequelize.sync().then(() => {
    console.log('Database sincronizada');
    app.listen(3000, () => {
        console.log('SQL Server ejecutando por la 3000');
    });
}).catch(error => {
    console.error('Error sincronizando la base de datos:', error);
});

// Importar rutas
const personaRoutes = require('./routes/persona.routes');
const tipoPersonaRoutes = require('./routes/tipoPersona.routes');
const articuloRoutes = require('./routes/articulo.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const detalleFacturaRoutes = require('./routes/detalleFactura.routes');
const ventaRoutes = require('./routes/venta.routes');
const authRoutes = require('./routes/auth.routes');

// Usar rutas
app.use('/personas', personaRoutes);
app.use('/tiposPersona', tipoPersonaRoutes);
app.use('/articulos', articuloRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/detalleFacturas', detalleFacturaRoutes);
app.use('/ventas', ventaRoutes);
app.use('/api/auth', authRoutes);