import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { dbConfig } from "../../config/db.config";

const basename = path.basename(__filename);
const db: any = {};

const sequelize = new Sequelize(dbConfig);

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename;
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
    model.sync({ alter: true });
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export { db };
