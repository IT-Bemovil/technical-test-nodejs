import jwt from "jsonwebtoken";
import logger from "../helpers/logger";

const generateJWT = (uid = "") => {
  try {
    const payload = { uid };
    const token = jwt.sign(payload, process.env.SECRET!, {
      expiresIn: "24h",
    });

    return token;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export { generateJWT };
