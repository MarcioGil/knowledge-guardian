import express from 'express';
import { 
  getContent, 
  getContentById, 
  getAdaptiveContent,
  validateAnswer,
  getCategories 
} from '../controllers/contentController.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', optionalAuth, getContent);
router.get('/categories', getCategories);
router.get('/adaptive', authenticateToken, getAdaptiveContent);
router.get('/:id', optionalAuth, getContentById);
router.post('/answer', authenticateToken, validateAnswer);

export default router;

