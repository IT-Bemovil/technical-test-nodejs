const getToDosService = require("../services/getToDos");

const getToDos = async (req, res) => {
    try {
      const todos = await getToDosService();
      return res.status(200).json(todos);
    } catch (error) {
      console.error('Error al obtener ToDos:', error);
      return res.status(500).json({ error: 'Error al obtener las tareas' });
    }
  };

  module.exports = getToDos;

// Código anteriormente explicado

