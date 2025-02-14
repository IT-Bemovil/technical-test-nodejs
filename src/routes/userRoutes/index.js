const express = require('express');
const postUser = require('../../controllers/postUser');

const userRoutes = express.Router();


userRoutes.post('/auth/register', postUser);


module.exports = userRoutes;