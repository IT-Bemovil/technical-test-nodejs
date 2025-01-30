import { Response } from "express";
import { db } from "../db/models";
import logger from "../helpers/logger";
import { ValidatedRequest } from "express-joi-validation";
import { TaskRequestSchema } from "../middlewares/validations/todo.validation";

const crtTask: any = {};

/**
 * @swagger
 * /tasks:
 *   post:
 *     tags: [Tasks]
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *     responses:
 *       201:
 *         description: The task was successfully created
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *               id:
 *                  type: number
 *               title:
 *                  type: string
 *               description:
 *                  type: string
 *               status:
 *                  type: string
 *               userId:
 *                  type: integer
 *               createdAt:
 *                  type: string
 *               updatedAt:
 *                  type: string
 *       500:
 *         description: Some server error
 */
crtTask.register = async (
  req: ValidatedRequest<TaskRequestSchema>,
  res: Response
) => {
  try {
    const { title, description, userId } = req.body;
    const newTask = await db.todo.create({
      title,
      description,
      userId,
    });

    res.status(201).json(newTask);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Returns the list of all the tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: The list of the tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               tasks:
 *                 properties:
 *                  id:
 *                     type: number
 *                  title:
 *                     type: string
 *                  description:
 *                     type: string
 *                  status:
 *                     type: string
 *                  userId:
 *                     type: integer
 *                  createdAt:
 *                     type: Date
 *                  updatedAt:
 *                     type: Date
 *       500:
 *         description: Some server error
 */
crtTask.getAll = async (
  req: ValidatedRequest<TaskRequestSchema>,
  res: Response
) => {
  try {
    const tasks = await db.todo.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get the task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: The task description by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                     type: number
 *                  title:
 *                     type: string
 *                  description:
 *                     type: string
 *                  status:
 *                     type: string
 *                  userId:
 *                     type: integer
 *                  createdAt:
 *                     type: Date
 *                  updatedAt:
 *                     type: Date
 *       500:
 *         description: Some server error
 */
crtTask.getById = async (
  req: ValidatedRequest<TaskRequestSchema>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const task = await db.todo.findByPk(id);
    res.status(200).json(task);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

/**
 * @swagger
 * /tasks/user/{id}:
 *   get:
 *     summary: Get the task by user id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The task description by user id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                     type: number
 *                  title:
 *                     type: string
 *                  description:
 *                     type: string
 *                  status:
 *                     type: string
 *                  userId:
 *                     type: integer
 *                  createdAt:
 *                     type: Date
 *                  updatedAt:
 *                     type: Date
 *       500:
 *         description: Some server error
 */
crtTask.getByUserId = async (
  req: ValidatedRequest<TaskRequestSchema>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const user = await db.user.findOne({
      where: { id },
      attributes: ["id", "email"],
      include: {
        model: db.todo,
        as: "todos",
      },
    });
    res.status(200).json(user);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update the task by the id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *              status:
 *                type: string
 *     responses:
 *       200:
 *         description: The task was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                     type: string
 *       500:
 *         description: Some server error
 */
crtTask.update = async (
  req: ValidatedRequest<TaskRequestSchema>,
  res: Response
) => {
  try {
    const { id } = req.params;
    let updateTask = req.body;
    const task = await db.todo.findByPk(id);
    if (!task) return res.status(400).json({ message: `Task not found` });
    await task.update(updateTask);
    res.status(200).json({
      message: "Task updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Remove the task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: The task was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                     type: string
 *       500:
 *         description: Some server error
 */
crtTask.delete = async (
  req: ValidatedRequest<TaskRequestSchema>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const task = await db.todo.findByPk(id);
    if (!task) return res.status(400).json({ message: `Task not found` });
    await task.drop();
    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export default crtTask;
