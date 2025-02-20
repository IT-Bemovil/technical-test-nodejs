import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    const { title, description, status } = req.body;
    const userId = req.userId;

    const task = await Task.create({ userId, title, description, status });
    res.json({mensaje: "Tarea creada con exito", task});
};

export const getTasks = async (req, res) => {
    const userId = req.userId;
    const tasks = await Task.findAll({where: {userId}});
    res.json(tasks);
};

export const updateTask = async (req, res) => {
    const {id} = req.params;
    const {title, description, status} = req.body;
    const userId = req.userId;

    const task = await Task.findOne({where: {id, userId}});
    if(!task) {
        return res.status(404).json({Error: "Tarea no encontrada"});
    }

    await Task.update({title, description, status}, {where: {id}});

    res.json({mensaje: "Tarea actualizada con exito"});
}

export const deleteTask = async (req, res) => {
    const {id} = req.params;
    const userId = req.userId;

    const task = await Task.findOne({where: {id, userId}});
    if(!task) {
        return res.status(404).json({Error: "Tarea no encontrada"});
    }

    await Task.destroy({where: {id}});
    res.json({mensaje: "Tarea eliminada con exito"});
}