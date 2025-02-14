const postUserService = require("../services/postUserService");



const postUser = async (req, res) => {
    try{
        // return res.send('Controlador crear Usuario')
        const {  email, password } = req.body;
        const procces = await postUserService(email, password);
        res.json({procces});

    }catch(e){
        console.error(e);
        res.status(500).send(`Error en el servidor -> ${e.message}`);
    }
};


module.exports = postUser;