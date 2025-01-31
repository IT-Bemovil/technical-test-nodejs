import Joi from "joi";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";

const idTaskSchema = Joi.object({
  id: Joi.number().required(),
});

const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  userId: Joi.number().required(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.string(),
  userId: Joi.number().required(),
});

interface TaskRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    id: number;
    title: string;
    description: string;
    status: string;
    userId: number;
  };
}

export { idTaskSchema, createTaskSchema, updateTaskSchema, TaskRequestSchema };
