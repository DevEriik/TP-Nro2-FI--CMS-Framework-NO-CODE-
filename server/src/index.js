import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reseniaRoutes from './routes/resenia.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        plataforma: 'ExpertoYa API',
        modulo: 'Sistema de Reseñas (Closed-Loop)',
        timestamp: new Date().toISOString()
    });
});

app.use('/api/resenas', reseniaRoutes);

app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        mensaje: `No existe el endpoint ${req.method} ${req.originalUrl}`
    });
});

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
    console.log(`Rutas activas:`);
    console.log(`   - POST http://localhost:${PORT}/api/resenas`);
    console.log(`   - GET  http://localhost:${PORT}/api/resenas/profesional/:id`);
    console.log(`   - GET  http://localhost:${PORT}/api/health`);
});
