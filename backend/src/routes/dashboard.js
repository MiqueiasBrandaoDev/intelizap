import express from 'express';
import { getDashboardStats, getRecentActivity, getSystemInsights } from '../controllers/dashboardController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get dashboard statistics
router.get('/stats', authenticateToken, getDashboardStats);

// Get recent activity
router.get('/activity', authenticateToken, getRecentActivity);

// Get system insights
router.get('/insights', authenticateToken, getSystemInsights);

export default router;