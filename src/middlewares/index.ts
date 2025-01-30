import express, { Express } from "express";
import { config } from "../config/app.config";
import bodyParser from "body-parser";
import cors from "cors";

export const setupMiddleware = (app: Express) => {
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors(config.cors));
};
