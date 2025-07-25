import express from 'express';
import { getResumos, createResumo, gerarResumo } from '../controllers/resumosController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get resumos with filtering and pagination
router.get('/', authenticateToken, getResumos);

// Create new resumo
router.post('/', authenticateToken, createResumo);

// Generate resumo for a group
router.post('/gerar', authenticateToken, gerarResumo);

export default router;