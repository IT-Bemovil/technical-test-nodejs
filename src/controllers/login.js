require('dotenv').config();
const { User } = require('../db')

const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    try{

        const { JWT_SECRET } = process.env

        const secret = JWT_SECRET 

        const { email, password } = req.body;
        if(!email ||!password){
            return res.status(400).json({ msg: 'Ingresar todos los parametros' });
        }
        
        const user = await User.findOne({
            where: { email, password }
          });

          if (!user) {
            return res.status(401).json({ msg: 'Usuario o contraseña incorrectos' });
          }

          const payload = {
            email : user.email,
            password : user.password
          };
          //firmo el token
          const token = jwt.sign(payload, secret);
    
          return res.status(200).json({ payload, token });
          

    }catch(e){
        console.error(e);
        return res.status(500).send(`Error en el servidor -> ${e.message}`);
    }
}

module.exports = login;