import taskService from "../services/task.service.js";

const taskController = {};

taskController.listAllTask = async (req, res) => {
  return taskService.listAllTask(req, res);
};

taskController.createTask = async (req, res) => {
  return taskService.createTask(req, res);
};

taskController.deleteTask = async (req, res) => {
  return taskService.deleteTask(req, res);
};

taskController.updateTask = async (req, res) => {
  return taskService.updateTask(req, res);
};

export default taskController;
