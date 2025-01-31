import Joi from "joi";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

interface AuthRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    email: string;
    password: string;
  };
}

export { authSchema, AuthRequestSchema };
