import bcrypt from 'bcrypt'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const roundSalt = 10

export const createUser = [
  body('email').isEmail().normalizeEmail().withMessage('Email is not valida'),
  body('password').isLength({ min: 6 }).withMessage('password must be at leats 6 characters'),

  async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return res.status(400).json({ isOk: false, errors: errors.array() });
    }
  }
]