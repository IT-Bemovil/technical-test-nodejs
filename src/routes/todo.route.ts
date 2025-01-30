import { Router } from "express";
import todoController from "../controllers/todo.controller";
import { createValidator } from "express-joi-validation";
import {
  createTaskSchema,
  idTaskSchema,
  updateTaskSchema,
} from "../middlewares/validations/todo.validation";

const router = Router();
const validator = createValidator();

router.get("/", todoController.getAll);
router.get(
  "/user/:id",
  validator.params(idTaskSchema),
  todoController.getByUserId
);
router.get("/:id", validator.params(idTaskSchema), todoController.getById);
router.post("/", validator.body(createTaskSchema), todoController.register);
router.put(
  "/:id",
  validator.params(idTaskSchema),
  validator.body(updateTaskSchema),
  todoController.update
);
router.delete("/:id", validator.params(idTaskSchema), todoController.delete);

export default router;
