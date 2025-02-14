const express = require('express');
const postToDo = require('../../controllers/postToDo');

const toDoRoutes = express.Router();


toDoRoutes.post('/tasks', postToDo);


module.exports =toDoRoutes;