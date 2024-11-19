import bcrypt from "bcrypt";

export const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptado = await bcrypt.hash(password, salt);
    return passwordEncriptado;
  } catch (error) {
    console.log(" error en encryptPassword", error.message);
  }
};
