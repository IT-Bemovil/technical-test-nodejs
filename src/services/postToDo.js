const { ToDo , User} = require('../db');


const postToDoService = async (title, description, userId) => {
    if(!title || !description || !userId){
        return 'title , description y usesrId son requeridos'
    }
    const toDO = await ToDo.findOne({ where: { title } });
     //consultar en bases si existe usuario con userId
     const user = await User.findByPk(userId);
    if(!user){return 'usuario no existe'}
    if(toDO){
        console.log(user)
        return 'La tarea ya existe';
    }else{
        const newToDo =  await ToDo.create({ title, description, userId});
        await newToDo.save();
        return newToDo
    }
};

module.exports = postToDoService;