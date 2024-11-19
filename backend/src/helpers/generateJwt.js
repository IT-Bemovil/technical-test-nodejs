import jwt from "jsonwebtoken";

export const generateJwt = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: "30d",
  });

  return token;
};
