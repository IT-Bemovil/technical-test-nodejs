const express = require('express');
const login = require('../../controllers/login');
const { verifyToken } = require('../../middlewares/auth');
const postUser = require('../../controllers/postUser');

const userRoutes = express.Router();


userRoutes.post('/auth/login', login);
userRoutes.post('/auth/register', verifyToken, postUser);


module.exports = userRoutes;