import { Router } from "express";
import authController from "../controllers/auth.controller";
import { createValidator } from "express-joi-validation";
import { authSchema } from "../middlewares/validations/auth.validation";

const router = Router();
const validator = createValidator();

router.post("/register", validator.body(authSchema), authController.register);
router.post("/login", validator.body(authSchema), authController.login);

export default router;
