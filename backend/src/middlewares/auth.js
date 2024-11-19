import jwt from "jsonwebtoken";
import { response } from "../helpers/response.js";
import { User } from "../user/models/user.model.js";

const messageNoAuth = (res) => {
  return response(res, 401, false, null, "no autorizado");
};

export const veriFyToken = async (req, res, next) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.SECRET, async (err, payload) => {
      if (err) {
        return messageNoAuth(res);
      }

      try {
        const userFound = await User.findByPk(payload.user);

        if (!userFound) {
          return messageNoAuth(res);
        }
      } catch (error) {
        return messageNoAuth(res);
      }

      req.userId = payload.user;
      next();
    });
  }

  if (!token) {
    return messageNoAuth(res);
  }
};
