import { generateJWT } from '../auth.config.js'
import { authSchema, validateObject } from '../utils/validation.js'
import { checkPassword } from '../utils/utils.js'
import { AuthError } from '../utils/errorHandler.js'
import { getUserByEmailQuery } from '../db/queries/users.js'
import { hashPassword } from '../utils/utils.js'
import { createUserQuery } from '../db/queries/users.js'

async function login(req, res, next) {
  try {
    const { email, password } = req.body

    const validatedData = validateObject({
      schema: authSchema,
      object: { email, password }
    })

    const user = await getUserByEmailQuery(validatedData.email)

    if (!user) {
      throw new AuthError('User not found')
    }

    const isPasswordCorrect = checkPassword(
      user.password,
      validatedData.password
    )

    if (!isPasswordCorrect) {
      throw new AuthError('Incorrect password')
    }

    const token = generateJWT(user.id)

    res.status(200).json({ token })
  } catch (error) {
    next(error)
  }
}

async function register(req, res, next) {
  try {
    const { email, password } = req.body
    const validatedData = validateObject({
      schema: authSchema,
      object: { email, password }
    })

    const existingUser = await getUserByEmailQuery(validatedData.email)

    if (existingUser) {
      throw new AuthError('Email already exists')
    }

    const hashedPassword = hashPassword(validatedData.password)

    await createUserQuery({ email, password: hashedPassword })

    res.status(200).json({ message: 'User registered successfully' })
  } catch (error) {
    next(error)
  }
}

export { login, register }
