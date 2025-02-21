import { User } from '../models.js'

export async function createUserQuery({ email, password }) {
  return await User.create({ email, password })
}

export async function getUserByEmailQuery(email) {
  return await User.findOne({ where: { email } })
}
