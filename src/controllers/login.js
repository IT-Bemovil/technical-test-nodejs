const loginService = require("../services/login");



const login = async (req, res) => {

    try{
        const { email, password } = req.body;
        const response = await loginService(email, password);
        return res.status(200).json(response);

    }catch(e){
        console.error(e);
        return res.status(500).send(`Error en el servidor -> ${e.message}`);
    }
}

module.exports = login;