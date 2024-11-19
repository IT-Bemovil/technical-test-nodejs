import { response } from "../../helpers/response.js";
import { Task } from "../model/task.model.js";

const taskService = {};

// ** SERVICIO PARA LISTAR TODAS LAS TAREAS DEL USUARIO LOGUEADO
taskService.listAllTask = async (req, res) => {
  try {
    // **  SOLO SE LISTA LAS TAREAS DEL USUARIO LOGUEADO
    const user = req.userId;
    const tasks = await Task.findAll({ where: { userId: user } });
    return response(res, 200, true, tasks, "lista de tareas");
  } catch (error) {
    return response(res, 500, false, null, error.message);
  }
};

// ** SERVICIO PARA CREAR UNA NUEVA TAREA
taskService.createTask = async (req, res) => {
  try {
    // ** NO HAY NECESIDAD DE VALIDAR SI EL USUARIO EXISTE, YA QUE ESTA VALIDADO EN EL MIDDLEWARE DE JWT Y EL ID DEL USUARIO LOGUEADO LO GUARDE EN REQ.USERID
    const user = req.userId;
    const { title, description = "" } = req.body;

    const newTask = await Task.create({
      title,
      description,
      userId: user,
    });

    return response(res, 201, true, newTask, "tarea creada exitosamente");
  } catch (error) {
    return response(res, 500, false, null, error.message);
  }
};

// ** SERVICIO PARA ELIMINAR UNA TAREA
taskService.deleteTask = async (req, res) => {
  try {
    const user = req.userId;
    const { id } = req.params;

    const taskFound = await Task.findByPk(id);
    if (!taskFound) {
      return response(res, 404, false, null, "tarea no encontrada");
    }

    if (taskFound.userId !== user) {
      return response(res, 401, false, null, "no puedes eliminar esta tarea");
    }

    await taskFound.destroy();

    return response(res, 200, true, null, "tarea eliminada exitosamente");
  } catch (error) {
    return response(res, 500, false, null, error.message);
  }
};

// ** SERVICIO PARA ACTUALIZAR UNA TAREA
taskService.updateTask = async (req, res) => {
  try {
    const user = req.userId;
    const { id } = req.params;

    const taskFound = await Task.findByPk(id);
    if (!taskFound) {
      return response(res, 404, false, null, "tarea no encontrada");
    }

    if (taskFound.userId !== user) {
      return response(res, 401, false, null, "no puedes actualizar esta tarea");
    }

    await taskFound.update(req.body);
    return response(res, 200, true, null, "tarea actualizada exitosamente");
  } catch (error) {
    return response(res, 500, false, null, error.message);
  }
};

export default taskService;
