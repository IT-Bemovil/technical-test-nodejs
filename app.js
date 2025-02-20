import express from 'express';
import authRoutes from './src/routes/authRoutes.js';
import authTask from './src/routes/authTask.js';
import sequelize from './src/config/database.js';

const app = express();
app.use(express.json());

app.use('/rest-api/auth', authRoutes);
app.use('/rest-api/task', authTask);

sequelize.sync()
.then(() => {console.log("Connection has been established successfully.")})
.catch((error) => {console.error("Unable to connect to the database:", error)});

export default app;