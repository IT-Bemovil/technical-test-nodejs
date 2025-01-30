import { Router } from "express";
import todoController from "../controllers/todo.controller";

const router = Router();

router.get("/", todoController.getAll);
router.get("/:id", todoController.getById);
router.post("/", todoController.register);
router.put("/:id", todoController.update);
router.delete("/:id", todoController.delete);

export default router;
