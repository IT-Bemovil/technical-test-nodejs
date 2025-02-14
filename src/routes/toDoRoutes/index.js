const express = require('express');
const postToDo = require('../../controllers/postToDo');
const getToDos = require('../../controllers/getToDos');
const updateToDo = require('../../controllers/updateToDos');
const deleteToDo = require('../../controllers/deleteToDos');

const toDoRoutes = express.Router();


toDoRoutes.post('/tasks', postToDo);
toDoRoutes.get('/tasks', getToDos);
toDoRoutes.put('/tasks/:id', updateToDo);
toDoRoutes.delete('/tasks/:id', deleteToDo);


module.exports =toDoRoutes;