const postToDoService = require("../services/postToDo");



const postToDo = async (req, res) => {
    try{
        // return res.send('Controlador crear Usuario')
        const {
            title,
            description,
            userId
          } = req.body;

        const procces = await postToDoService(title, description, userId );
        res.json(procces);

    }catch(e){
        console.error(e);
        res.status(500).send(`Error en el servidor -> ${e.message}`);
    }
};


module.exports = postToDo;