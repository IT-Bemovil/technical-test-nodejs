import { User } from "../features/User.js";
import {createUser, validateUser} from '../services/userServices.js' 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const authRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const passwordCryped = await bcrypt.hash(password,10) 
    await createUser({ email, passwordCryped });
    res
      .status(200)
      .json({
        message: "User registered successfully",
      });
  } catch (error) {
    if(error.name==='SequelizeUniqueConstraintError'){
      error.message = `Email already exists`
    }
    next(error);
  }
};

const authLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validatedUser =  await validateUser({email,password})
    if(!validatedUser){
      return res.status(401).json({message:'Invalid email or password'})
    }
    const token = jwt.sign({idUser:validatedUser.id},process.env.JWT_SECRET,{
      expiresIn:'12h'
    })
    res.status(200).json({ token,user:validatedUser});
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
