import express from 'express';
import { 
  getGrupos, 
  getGrupo, 
  createGrupo, 
  updateGrupo, 
  deleteGrupo 
} from '../controllers/gruposController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Aplicar autenticação a todas as rotas de grupos
router.use(authenticateToken);

// GET /api/grupos?usuario_id=1&page=1&limit=50
router.get('/', getGrupos);

// GET /api/grupos/:id
router.get('/:id', getGrupo);

// POST /api/grupos
router.post('/', createGrupo);

// PUT /api/grupos/:id
router.put('/:id', updateGrupo);

// DELETE /api/grupos/:id
router.delete('/:id', deleteGrupo);

export default router;