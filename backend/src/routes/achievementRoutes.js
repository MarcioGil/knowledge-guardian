import express from 'express';
import { getAchievements, unlockAchievement } from '../controllers/achievementController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getAchievements);
router.post('/unlock', unlockAchievement);

export default router;

