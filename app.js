require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/database')


app.use(express.json());

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
});   

const routes = require('./routes/persona.routes');
app.use('/personas', routes);

