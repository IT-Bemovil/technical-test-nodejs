import express, { Express } from "express";
import { config } from "../config/app.config";
import bodyParser from "body-parser";
import cors from "cors";
import { errorLogger, httpLogger } from "./logger.middleware";

export const setupMiddleware = (app: Express) => {
  app.use(httpLogger);
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors(config.cors));
  app.use(errorLogger);
};
