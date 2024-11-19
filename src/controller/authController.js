import { User } from "../features/User.js";

const authRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    User.create({ email, password });
    res
      .status(200)
      .json({
        message: "User registered successfully",
        user: { email, password },
      });
  } catch (error) {
    next(error);
  }
};

const authLogin = async (req, res, next) => {
  try {
    res.status(200).json({ token: "token" });
  } catch (error) {
    next(error);
  }
};

const authUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ message: "success", users });
  } catch (error) {
    next(error);
  }
};
export { authRegister, authLogin, authUsers };
