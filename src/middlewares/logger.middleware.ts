import morgan from "morgan";
import { Request, Response, NextFunction } from "express";
import logger from "../helpers/logger";

const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

const morganFormat =
  ":method :url :status :res[content-length] - :response-time ms";

export const httpLogger = morgan(morganFormat, { stream });

export const errorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("Error processing request:", {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });
  next(err);
};
