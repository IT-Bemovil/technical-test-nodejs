const express = require('express');
const login = require('../../controllers/login');
const { verifyToken } = require('../../middlewares/auth');

const userRoutes = express.Router();


userRoutes.post('/auth/login', login);


module.exports = userRoutes;