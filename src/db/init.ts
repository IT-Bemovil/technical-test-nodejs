import { Sequelize } from "sequelize";
import logger from "../helpers/logger";
import { dbConfig } from "../config/db.config";

const dbInstance = new Sequelize(dbConfig);

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
