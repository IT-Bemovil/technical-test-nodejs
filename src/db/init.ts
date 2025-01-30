import { Sequelize } from "sequelize";
import logger from "../helpers/logger";

const dbUrl = process.env.DATABASE!;

const dbInstance = new Sequelize(dbUrl);

async function init() {
  try {
    await dbInstance.sync({ logging: false });
    logger.info("Db initialized");
  } catch (error) {
    logger.error(error);
  }
}

init();

export default dbInstance;
