// user.controller.js

import userService from "../services/user.services.js";
const userController = {};

// ** registrar usuario
userController.register = async (req, res) => {
  return userService.register(req, res);
};

// ** login de usuario
userController.login = async (req, res) => {
  return userService.login(req, res);
};

// ** obtener usuario por token
userController.getUserByToken = async (req, res) => {
    return userService.getUserByToken(req, res);
  };
  

export default userController;
