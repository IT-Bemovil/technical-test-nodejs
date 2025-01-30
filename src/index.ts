import express from "express";
import "dotenv/config";
import authRoute from "./routes/auth.route";
import todoRoute from "./routes/todo.route";
import "./db/init";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use("/auth", authRoute);
app.use("/tasks", todoRoute);

app.listen(port, () => {
  console.log(`Server listen on port: ${port}`);
});
