import { Express } from "express";
import authRoute from "./auth.route";
import todoRoute from "./todo.route";
import { validateToken } from "../middlewares/token.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../config/swagger.config";

export const setupRoutes = (app: Express) => {
  app.use("/auth", authRoute);
  app.use("/tasks", validateToken, todoRoute);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("*", (req, res) => {
    res.status(404).json({ message: "Not found" });
  });
};
