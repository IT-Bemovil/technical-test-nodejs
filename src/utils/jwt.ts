import jwt from "jsonwebtoken";

const generateJWT = (uid = "") => {
  try {
    const payload = { uid };
    const token = jwt.sign(payload, process.env.SECRET!, {
      expiresIn: "24h",
    });

    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { generateJWT };
