import express from 'express';
import { getLeaderboard, getTopPlayers, getMyRank } from '../controllers/leaderboardController.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', optionalAuth, getLeaderboard);
router.get('/top', optionalAuth, getTopPlayers);
router.get('/me', authenticateToken, getMyRank);

export default router;

