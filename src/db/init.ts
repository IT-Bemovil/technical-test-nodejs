import { Sequelize } from "sequelize";

const dbUrl = process.env.DATABASE!;

const dbInstance = new Sequelize(dbUrl);

async function init() {
  try {
    await dbInstance.sync({ alter: true, force: true });
    console.log("Db initialized");
  } catch (error) {
    console.log(error);
  }
}

init();

export default dbInstance;
