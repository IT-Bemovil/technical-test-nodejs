import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../db/models";
import { generateJWT } from "../helpers/jwt";
import logger from "../helpers/logger";
import { ValidatedRequest } from "express-joi-validation";
import { AuthRequestSchema } from "../middlewares/validations/auth.validation";

const crtAuth: any = {};
const saltRounds = 10;

crtAuth.register = async (
  req: ValidatedRequest<AuthRequestSchema>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const user = await db.user.findOne({ where: { email: email } });
    if (user) {
      return res.status(400).json({
        status: "error",
        message: "Validar campos",
      });
    }
    await db.user.create({
      email,
      password: hash,
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

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
