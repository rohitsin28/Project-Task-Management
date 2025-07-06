import express from 'express';
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
} from '../../controllers/task/taskController.js';
import { authenticateUser } from '../../middlewares/auth.js';

const router = express.Router();

router.post('/create', authenticateUser, createTask);
router.get('/get/:projectId', authenticateUser, getTasksByProject);
router.patch('/update/:id', authenticateUser, updateTask);
router.delete('/delete/:id', authenticateUser, deleteTask);

export default router;
