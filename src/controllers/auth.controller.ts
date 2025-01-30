import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../db/models";
import { generateJWT } from "../helpers/jwt";
import logger from "../helpers/logger";

const crtAuth: any = {};
const saltRounds = 10;

crtAuth.register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || password.length < 6) {
      res.status(400).json({
        status: "error",
        message:
          "Todos los campos son requeridos y la contrasena debe ser mayor a 6 caracteres",
      });
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const user = await db.user.findOne({ where: { email: email } });
    if (user) {
      res.status(400).json({
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

crtAuth.login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "User or password invalid " });
    }
    const user = await db.user.findOne({ where: { email: email } });
    if (!user) {
      res.status(400).json({
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
