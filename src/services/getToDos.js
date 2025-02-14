const { ToDo } = require('../db');


// Obtener todas las tareas (READ ALL)
const getToDosService = async () => {
    const todos = await ToDo.findAll();
    return todos;
};

module.exports = getToDosService