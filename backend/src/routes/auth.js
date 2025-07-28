import express from 'express';
import { login, register, forgotPassword } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/register  
router.post('/register', register);

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword);

export default router;