import { Router } from 'express';
const router = Router();
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController';
import authenticateUser from '../middleware/auth';

router.post('/', authenticateUser, createTask);
router.get('/', getAllTasks);
router.get('/:taskId', getTaskById);
router.put('/:taskId', authenticateUser, updateTask);
router.delete('/:taskId', authenticateUser, deleteTask);

export default router;
