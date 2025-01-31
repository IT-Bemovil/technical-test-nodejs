import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../db/models";
import { generateJWT } from "../helpers/jwt";
import logger from "../helpers/logger";
import { ValidatedRequest } from "express-joi-validation";
import { AuthRequestSchema } from "../middlewares/validations/auth.validation";

const crtAuth: any = {};
const saltRounds = 10;

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Server error
 */
crtAuth.register = async (
  req: ValidatedRequest<AuthRequestSchema>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    await db.user.create({
      email,
      password: hash,
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error: any) {
    logger.error(error);
    if (error.parent.code === "23505") {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    }
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: User or password invalid
 *       500:
 *         description: Server error
 */
crtAuth.login = async (
  req: ValidatedRequest<AuthRequestSchema>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User or password invalid ",
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "User or password invalid " });
    const token = generateJWT(user.id);

    res.status(200).json({
      token,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

export default crtAuth;
