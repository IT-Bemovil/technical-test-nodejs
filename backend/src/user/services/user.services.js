// user.services.js

import { encryptPassword } from "../../helpers/encryptPassword.js";
import { generateJwt } from "../../helpers/generateJwt.js";
import { response } from "../../helpers/response.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const userService = {};

// ** registrar usuario
userService.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ where: { email } });

    if (userFound) {
      return response(
        res,
        400,
        false,
        null,
        "el correo ya existe en otro registro"
      );
    }

    const newUser = await User.create({
      email,
      password: await encryptPassword(password),
    });

    return response(res, 201, true, newUser, "User registered successfully");
  } catch (error) {
    console.log(error);
    return response(res, 500, false, null, error.message);
  }
};

// ** login de usuario
userService.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ where: { email } });

    if (!userFound) {
      return response(res, 404, false, null, "usuario no encontrado");
    }

    const isPasswordMatch = await bcrypt.compare(password, userFound.password);

    if (!isPasswordMatch) {
      return response(res, 400, false, null, "email o password incorrectos");
    }

    const token = generateJwt({ user: userFound.id });

    return response(res, 200, true, { token }, "login exitoso");
  } catch (error) {
    return response(res, 500, false, null, error.message);
  }
};

export default userService;
