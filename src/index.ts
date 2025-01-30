import express from "express";
import "dotenv/config";
import "./db/init";
import { setupMiddleware } from "./middlewares";
import { setupRoutes } from "./routes";
import { config } from "./config/app.config";

const app = express();

app.use(setupMiddleware);
app.use(setupRoutes);

app.listen(config.port, () => {
  console.log(`Server listen on port: ${config.port}`);
});
