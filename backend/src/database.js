import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  username: "postgres",
  password: "1234",
  host: "localhost",
  dialect: "postgres",
  database: "prueba",
  port: 5432,
  sync: true,
});

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Base de datos conectada");
  } catch (error) {
    console.error("erro al conectar a la base de datos:", error);
  }
};

export default sequelize;
