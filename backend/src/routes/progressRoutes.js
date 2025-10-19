import express from 'express';
import { 
  getProgress, 
  updateProgress, 
  completeStage,
  collectArtifact 
} from '../controllers/progressController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getProgress);
router.put('/', updateProgress);
router.post('/stage/complete', completeStage);
router.post('/artifact/collect', collectArtifact);

export default router;

