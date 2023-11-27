import { Router } from 'express';
const router = Router();
import { taskCompletionStats } from '../controllers/taskController';

router.get('/task-completion-stats', taskCompletionStats);

export default router;
