import express from 'express';
import { 
  connectInstance, 
  getInstanceStatus, 
  disconnectInstance,
  getInstanceGroups
} from '../controllers/evolutionController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Aplicar autenticação a todas as rotas da Evolution
router.use(authenticateToken);

// POST /api/evolution/connect
router.post('/connect', connectInstance);

// GET /api/evolution/status/:instanceName
router.get('/status/:instanceName', getInstanceStatus);

// DELETE /api/evolution/disconnect/:instanceName
router.delete('/disconnect/:instanceName', disconnectInstance);

// GET /api/evolution/groups/:instanceName
router.get('/groups/:instanceName', getInstanceGroups);

export default router;