import express from 'express';
import { 
  getMensagens, 
  createMensagem, 
  deleteMensagem 
} from '../controllers/mensagensController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Aplicar autenticação a todas as rotas de mensagens
router.use(authenticateToken);

// GET /api/mensagens?grupo_id=1&page=1&limit=100
router.get('/', getMensagens);

// POST /api/mensagens
router.post('/', createMensagem);

// DELETE /api/mensagens/:id
router.delete('/:id', deleteMensagem);

export default router;