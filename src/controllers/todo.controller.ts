import { Response } from "express";
import { db } from "../db/models";
import logger from "../helpers/logger";
import { ValidatedRequest } from "express-joi-validation";
import { TaskRequestSchema } from "../middlewares/validations/todo.validation";

const crtTask: any = {};

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
