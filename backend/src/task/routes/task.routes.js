import { Router } from "express";
import taskController from "../controller/task.controller.js";
import { veriFyToken } from "../../middlewares/auth.js";

const route = Router();

route.get("/", veriFyToken, taskController.listAllTask);

route.post("/", veriFyToken, taskController.createTask);

route.put("/:id", veriFyToken, taskController.updateTask);

route.delete("/:id", veriFyToken, taskController.deleteTask);

export default route;
