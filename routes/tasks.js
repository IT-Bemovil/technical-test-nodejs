import { Router } from 'express'
import { authenticateUser } from '../auth.config.js'
import {
  createTask,
  getTask,
  updateTask,
  getAllTasks,
  deleteTask
} from '../controller/tasks.js'

const tasksRouter = Router()
tasksRouter.use(authenticateUser)

tasksRouter.get('/', getAllTasks)
tasksRouter.get('/:id', getTask)
tasksRouter.post('/', createTask)
tasksRouter.put('/:id', updateTask)
tasksRouter.delete('/:id', deleteTask)

export { tasksRouter }
