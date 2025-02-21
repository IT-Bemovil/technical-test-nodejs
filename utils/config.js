import { z } from 'zod'
import dotenv from 'dotenv'
dotenv.config()

const envVariable = z.string().min(1).max(255)

const envSSchema = z.object({
  ACCESS_TOKEN: envVariable,
  PASSWORD_HASH: envVariable,
  PORT: envVariable
})

const { success, error, data } = envSSchema.safeParse(process.env)

if (!success) {
  console.error('❌ Error validating environment variables:', error.format())
  process.exit(1)
}

export const { ACCESS_TOKEN, PASSWORD_HASH, PORT } = data
