//cargar variables de entorno
require('dotenv').config();


const boom = require('boom');
const jwt = require('jsonwebtoken');


//middleware de verificacion de token para dar permisos de usuario
function verifyToken(req, res, next) {
    const { JWT_SECRET } = process.env;
    const token = req.headers["token"];
    const secret = JWT_SECRET;
  
    function verifyToken(token, secret) {
      return jwt.verify(token, secret);
    }
  
    const payload = verifyToken(token, secret);
  
    if (payload.iat) {
      next();
    } else {
      next(boom.unauthorized());
    }
  }


module.exports = {
    verifyToken
};