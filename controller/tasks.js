import {
  validateObject,
  getTaskByIdSchema,
  createTaskSchema,
  uptateTaksSchema,
  deleteTaskSchema
} from '../utils/validation.js'
import {
  createTaskQuery,
  getTaskQuery,
  updateTaskQuery,
  getAllTasksQuery,
  deleteTaskQuery
} from '../db/queries/tasks.js'
import { NotFoundError } from '../utils/errorHandler.js'

async function getAllTasks(req, res, next) {
  try {
    const tasks = await getAllTasksQuery()
    res.status(200).json(tasks)
  } catch (error) {
    next(error)
  }
}

async function getTask(req, res, next) {
  try {
    const { id } = req.params

    const validatedId = validateObject({
      schema: getTaskByIdSchema,
      object: { id: Number(id) }
    })

    const task = await getTaskQuery({ id: validatedId.id })

    if (!task) {
      throw new NotFoundError('Task not found')
    }

    res.status(200).json(task)
  } catch (error) {
    next(error)
  }
}

async function createTask(req, res, next) {
  try {
    const { title, description } = req.body

    const { title: validatedTitle, description: validatedDescription } =
      validateObject({
        schema: createTaskSchema,
        object: { title, description }
      })

    await createTaskQuery({
      title: validatedTitle,
      description: validatedDescription
    })

    res.status(201).json({ message: 'Task created successfully' })
  } catch (error) {
    next(error)
  }
}

async function updateTask(req, res, next) {
  try {
    const { id } = req.params
    const { title, description, status } = req.body

    const {
      id: validatedId,
      title: validatedTitle,
      description: validatedDescription,
      status: validatedStatus
    } = validateObject({
      schema: uptateTaksSchema,
      object: { id: Number(id), title, description, status }
    })

    await updateTaskQuery({
      id: validatedId,
      title: validatedTitle,
      description: validatedDescription,
      status: validatedStatus
    })

    res.status(200).json({ message: 'Task updated successfully' })
  } catch (error) {
    next(error)
  }
}

async function deleteTask(req, res, next) {
  try {
    const { id } = req.params

    const validatedId = validateObject({
      schema: deleteTaskSchema,
      object: { id: Number(id) }
    })

    await deleteTaskQuery({ id: validatedId.id })

    res.status(200).json({ message: 'Task deleted successfully' })
  } catch (error) {
    next(error)
  }
}

export { createTask, getTask, getAllTasks, updateTask, deleteTask }
