import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const secretKey = "superSecreta";

export const register = async (req, res) => {
    const {name ,email, password,role} = req.body;
    const userExiste = await User.findOne({where: {email}});
    if(userExiste) {
        return res.status(404).json({message: "el email ya esta registrado"});
    }

    const user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 8),
        role,
    });

    const token = jwt.sign({id: user.id}, secretKey, {
        expiresIn: '1h',
    });

    res.json({mensaje: "Usuario creado con exito", token});
}

export const login = async (req, res) => {
    const {email,password} = req.body;
    const user = await User.findOne({where: {email}});
    if(!user){
        return res.status(404).json({message: "Usuario no encontrado"});
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    
    if (!passwordIsValid) {
        return res.status(401).json({message: "Credenciales invalidas"});
    }

    const Token = jwt.sign({id: user.id}, secretKey, {
        expiresIn: '1h',
    });

    res.json({message: "Login exitoso", Token});
}