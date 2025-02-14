const express = require('express');

const router = express.Router();

const userRoutes = require('./userRoutes');
const toDoRoutes = require('./toDoRoutes');

router.use('/',userRoutes)
router.use('/',toDoRoutes)


module.exports = router;