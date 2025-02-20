import jwt from 'jsonwebtoken';

const secretKey = 'superSecreta';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }
    jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
        if(err) {
            return res.status(401).json({ message: 'Token invalido' });
        }
        req.userId = decoded.id;
        next();
    });
}

export default verifyToken;