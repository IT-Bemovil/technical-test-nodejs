import express from 'express';
import verifyToken from '../middlewares/authMiddleWare.js';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.post('/create', verifyToken, createTask);
router.get('/ver', verifyToken, getTasks);
router.put('/actualizar/:id', verifyToken, updateTask);
router.delete('/eliminar/:id', verifyToken, deleteTask);

export default router;