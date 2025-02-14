


require('dotenv').config();
const { User } = require('../db')

const jwt = require('jsonwebtoken');


const loginService = async (email, password) => {
    

        const { JWT_SECRET } = process.env

        const secret = JWT_SECRET 

        if(!email ||!password){
            return res.status(400).json({ msg: 'Ingresar todos los parametros' });
        }
        
        const user = await User.findOne({
            where: { email, password }
          });

          if (!user) {
            return { msg: 'Usuario o contraseña incorrectos' };
          }

          const payload = {
            email : user.email,
            password : user.password
          };
          //firmo el token
          const token = jwt.sign(payload, secret);
    
          return { payload, token };
          

}

module.exports = loginService;