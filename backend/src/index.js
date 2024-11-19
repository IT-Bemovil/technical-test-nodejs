process.loadEnvFile();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import sequelize, { connectDb } from "./database.js";

import userRoutes from "./user/routes/user.routes.js";
import taskRoutes from "./task/routes/task.routes.js";

connectDb();

const app = express();

app.set("Port", process.env.PORT);

app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", userRoutes);
app.use("/tasks", taskRoutes);

const main = async () => {
  await sequelize.sync({ force: false });
  app.listen(app.get("Port"), () => {
    console.log("servidor escuchando por el puerto", app.get("Port"));
  });
};

main();
