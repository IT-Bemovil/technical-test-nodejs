import express from "express";
import "dotenv/config";
import "./db/init";
import { setupMiddleware } from "./middlewares";
import { setupRoutes } from "./routes";
import { config } from "./config/app.config";
import logger from "./helpers/logger";

const app = express();

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", {
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection:", { reason, promise });
  process.exit(1);
});

setupMiddleware(app);
setupRoutes(app);

app.listen(config.port, () => {
  logger.info(`Server listen`, {
    port: config.port,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});
