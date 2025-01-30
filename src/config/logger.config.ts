import { format } from "winston";
const { combine, timestamp, printf, colorize, json } = format;

export const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

export const logColors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

export const loggerConfig = {
  development: {
    level: "debug",
    format: combine(
      colorize({ all: true }),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    filepath: {
      error: "logs/development/error.log",
      combined: "logs/development/combined.log",
    },
  },
  production: {
    level: "info",
    format: combine(timestamp(), json()),
    filepath: {
      error: "logs/production/error.log",
      combined: "logs/production/combined.log",
    },
  },
  test: {
    level: "debug",
    format: combine(timestamp(), json()),
    filepath: {
      error: "logs/test/error.log",
      combined: "logs/test/combined.log",
    },
  },
};

type Environment = "development" | "production" | "test";

export const getCurrentConfig = () => {
  const environment: Environment =
    (process.env.NODE_ENV as Environment) || "development";
  return loggerConfig[environment];
};
