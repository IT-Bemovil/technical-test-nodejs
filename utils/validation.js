import { z } from 'zod'
import { ValidationFieldsError } from './errorHandler.js'

//User schemas
const emailSchema = z.string().email()
const passwordSchema = z.string().min(8).max(255)

//Task schemas
const idSchema = z.number().min(1).max(100)
const titleSchema = z.string().min(1).max(255)
const descriptionSchema = z.string().min(1).max(255)
const statusSchema = z.enum(['pending', 'completed'])

export const authSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

export const getTaskByIdSchema = z.object({
  id: idSchema
})

export const createTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema.optional()
})

export const uptateTaksSchema = z.object({
  id: idSchema,
  title: titleSchema.optional(),
  description: descriptionSchema.optional(),
  status: statusSchema.optional()
})

export const deleteTaskSchema = z.object({
  id: idSchema
})

export function validateObject({ schema, object }) {
  const zodValidation = schema.safeParse(object)

  if (!zodValidation.success) {
    throw new ValidationFieldsError({
      errors: zodValidation.error.flatten().fieldErrors
    })
  }

  return zodValidation.data
}
