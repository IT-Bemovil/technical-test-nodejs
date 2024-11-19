// user.routes.js

import { Router } from "express";
import userController from "../controller/user.controller.js";
import validateSchema from "../../middlewares/validateSchema.js";
import {
  createUserSchema,
  loginUserSchema,
} from "../validation/user.schema.js";

const route = Router();

route.post("/login", validateSchema(loginUserSchema), userController.login);

route.post(
  "/register",
  validateSchema(createUserSchema),
  userController.register
);


export default route;
