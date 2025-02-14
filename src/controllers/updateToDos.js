const updateToDoService = require("../services/updateToDoService");

const updateToDo = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      const updatedToDo = await updateToDoService(id, updates);
  
      // Si ocurre algún error en la actualización
      if (typeof updatedToDo === 'string' || updatedToDo.error) {
        return res.status(400).json({ error: updatedToDo.error || updatedToDo });
      }
  
      return res.status(200).json({
        "message": "Task updated successfully"
      });
    } catch (error) {
      console.error('Error al actualizar ToDo:', error);
      return res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
  };

  module.exports = updateToDo;