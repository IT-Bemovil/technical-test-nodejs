import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN } from './utils/config.js'

export const TokenExpiredError = jwt.TokenExpiredError
export const JsonWebTokenError = jwt.JsonWebTokenError

export function generateJWT(userId) {
  return jwt.sign({ userId }, ACCESS_TOKEN, {
    expiresIn: '1h'
  })
}

export function authenticateUser(req, res, next) {
  const bearerToken = req.headers.authorization

  if (!bearerToken) {
    return res.status(401).json({
      message: 'No bearer token provided'
    })
  }

  try {
    const token = bearerToken.split(' ')[1]
    const { userId } = jwt.verify(token, ACCESS_TOKEN)

    if (userId === undefined) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    req.userId = userId
    next()
  } catch (error) {
    next(error)
  }
}
