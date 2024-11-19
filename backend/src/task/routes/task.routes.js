import { Router } from "express";
import taskController from "../controller/task.controller.js";
import { veriFyToken } from "../../middlewares/auth.js";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validation/task.shema.js";
import validateSchema from "../../middlewares/validateSchema.js";

const route = Router();

route.get(
  "/",
  veriFyToken,

  taskController.listAllTask
);

route.post(
  "/",
  veriFyToken,
  validateSchema(createTaskSchema),
  taskController.createTask
);

route.put(
  "/:id",
  validateSchema(updateTaskSchema),
  veriFyToken,
  taskController.updateTask
);

route.delete("/:id", veriFyToken, taskController.deleteTask);

export default route;
