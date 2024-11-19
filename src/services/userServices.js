import { User } from "../features/User.js";

export const createUser = (user) => {
  return User.create(user); 
};


export const validateUser = (user)=>{
  return User.findOne({where:{email:user.email, password:user.password}})
}