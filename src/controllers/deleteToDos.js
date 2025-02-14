const deleteToDoService = require("../services/deleteToDo");

const deleteToDo = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await deleteToDoService(id);
  
      // Si el servicio devuelve un mensaje de error
      if (typeof result === 'string' && result.includes('Error')) {
        return res.status(400).json({ error: result });
      }
  
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error al eliminar ToDo:', error);
      return res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
  };

  module.exports = deleteToDo;
  