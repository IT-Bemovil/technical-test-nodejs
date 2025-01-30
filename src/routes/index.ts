import { Express } from "express";
import authRoute from "./auth.route";
import todoRoute from "./todo.route";
import { validateToken } from "../middlewares/token.middleware";

export const setupRoutes = (app: Express) => {
  app.use("/auth", authRoute);
  app.use("/tasks", validateToken, todoRoute);
};
