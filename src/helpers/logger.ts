import winston from "winston";
import {
  getCurrentConfig,
  logLevels,
  logColors,
} from "../config/logger.config";

const config = getCurrentConfig();

winston.addColors(logColors);

const logger = winston.createLogger({
  levels: logLevels,
  format: config.format,
  level: config.level,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: config.filepath.error,
      level: "error",
      maxsize: 5242880,
      maxFiles: 5,
    }),

    new winston.transports.File({
      filename: config.filepath.combined,
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});

export const logInfo = (message: string, meta = {}) =>
  logger.info(message, meta);
export const logError = (message: string, meta = {}) =>
  logger.error(message, meta);
export const logWarn = (message: string, meta = {}) =>
  logger.warn(message, meta);
export const logDebug = (message: string, meta = {}) =>
  logger.debug(message, meta);

export default logger;
