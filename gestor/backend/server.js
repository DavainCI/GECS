const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const citasRoutes = require('./routes/citas'); // Agregar esta línea

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/citas', citasRoutes); // Agregar esta línea

// Ruta de prueba
app.get('/api', (req, res) => {
    res.json({ message: 'API de Glamour Express funcionando' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});