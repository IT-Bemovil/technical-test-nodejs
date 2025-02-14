const { ToDo } = require('../db');



// Actualizar una tarea (UPDATE)
const updateToDoService = async (id, updates) => {
    if (!id) return 'El id es requerido';

    // Verificar que la tarea exista
    const todo = await ToDo.findByPk(id);
    if (!todo) return 'Tarea no encontrada';

    // Si se actualiza el userId, verificar que el usuario exista
    if (updates.userId) {
        const user = await User.findByPk(updates.userId);
        if (!user) return 'Usuario no existe';
    }

    // Actualizar la tarea con los nuevos datos
    await todo.update(updates);
    return todo;
};

module.exports = updateToDoService;
