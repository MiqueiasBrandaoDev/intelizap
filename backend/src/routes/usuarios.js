import express from 'express';
import { getUser, updateUser, changePassword, deleteUser } from '../controllers/usuariosController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Aplicar autenticação a todas as rotas de usuários
router.use(authenticateToken);

// GET /api/usuarios/:id
router.get('/:id', getUser);

// PUT /api/usuarios/:id
router.put('/:id', updateUser);

// PUT /api/usuarios/:id/password
router.put('/:id/password', changePassword);

// DELETE /api/usuarios/:id
router.delete('/:id', deleteUser);

export default router;