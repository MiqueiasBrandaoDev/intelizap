import express from 'express';
import { 
  getAdminStats, 
  getUsers, 
  updateUserPlan, 
  getSystemLogs 
} from '../controllers/adminController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authenticateAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// Apply authentication middleware to all admin routes
router.use(authenticateToken);
router.use(authenticateAdmin);

// Dashboard stats
router.get('/stats', getAdminStats);

// User management
router.get('/users', getUsers);
router.put('/users/:userId/plan', updateUserPlan);

// System logs
router.get('/logs', getSystemLogs);

export default router;