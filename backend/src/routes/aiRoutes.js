import express from 'express';
import { 
  getHint, 
  generateNewQuestion, 
  getPerformanceAnalysis,
  getCustomExplanation,
  getLearningPath,
  adaptDifficulty 
} from '../controllers/aiController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/hint', getHint);
router.post('/generate', generateNewQuestion);
router.get('/analysis', getPerformanceAnalysis);
router.post('/explain', getCustomExplanation);
router.get('/learning-path', getLearningPath);
router.post('/adapt', adaptDifficulty);

export default router;

