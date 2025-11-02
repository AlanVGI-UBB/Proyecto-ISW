import express from 'express';
import authRoutes from './authRoutes.js';

const router = express.Router();

// Rutas de autenticación
router.use('/auth', authRoutes);

// Ruta de prueba
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
  });
});

export default router;
