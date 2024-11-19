import { Router } from "express";
import { authLogin, authRegister,authUsers } from "../controller/authController.js";

export const authRoutes = Router();

authRoutes.post('/register',authRegister)
authRoutes.post('/login',authLogin)
authRoutes.get('/user',authUsers)


