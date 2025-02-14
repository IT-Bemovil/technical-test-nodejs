const { ToDo } = require('../db');

const deleteToDoService = async (id) => {
    if (!id) return 'El id es requerido';

    const todo = await ToDo.findByPk(id);
    if (!todo) return 'Tarea no encontrada';

    await todo.destroy();
    return {
        "message": "Task deleted successfully"
      };
};

module.exports = deleteToDoService;