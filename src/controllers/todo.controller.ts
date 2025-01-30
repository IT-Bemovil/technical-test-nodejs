import { Request, Response } from "express";
import { db } from "../db/models";

const crtTask: any = {};
const saltRounds = 10;

crtTask.register = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      res.status(400).json({
        status: "error",
        message: "All parameters are required",
      });
    }
    const newTask = await db.todo.create({
      title,
      description,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

crtTask.getAll = async (req: Request, res: Response) => {
  try {
    const tasks = await db.todo.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

crtTask.getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await db.todo.findByPk(id);
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

crtTask.update = async (req: Request, res: Response) => {
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

crtTask.delete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await db.todo.findByPk(id);
    if (!task) return res.status(400).json({ message: `Task not found` });
    await task.delete();
    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export default crtTask;
