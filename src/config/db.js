// Importar el paquete dotenv para la gestión de variables de entorno
require('dotenv').config();
const fs = require("fs");
const path = require('path');
const { Sequelize } = require('sequelize');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;

// Configurar la conexión a la base de datos PostgreSQL utilizando Sequelize
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    // Configuración de opciones específicas para PostgreSQL
    dialectOptions: {
      // Si no se usa SSL, se puede dejar vacío:
      // ssl: { require: false }
      // O si se requiere conexión segura:
      // ssl: {
      //   require: true,
      //   rejectUnauthorized: false
      // }
    },
    logging: false,
});
  
console.log(`Conectado a base de datos -> ${DB_DATABASE}`);

// Obtener el nombre del archivo actual
const basename = path.basename(__filename);

// Código comentado para la carga de modelos (descomentar y ajustar según sea necesario)
// const modelDefiners = [];
// fs.readdirSync(path.join(__dirname, 'models'))
//   .filter((file) => file.slice(-3) === '.js')
//   .forEach((file) => {
//     const model = require(path.join(__dirname, 'models', file));
//     modelDefiners.push(model);
//   });

// modelDefiners.forEach((model) => model(sequelize));

// const modelNames = Object.keys(sequelize.models);
// modelNames.forEach((modelName) => {
//   const capitalizedName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
//   sequelize.models[capitalizedName] = sequelize.models[modelName];
//   delete sequelize.models[modelName];
// });

// console.log('Modelos cargados en Sequelize:');
// Object.keys(sequelize.models).forEach(modelName => {
//   console.log(`- ${modelName}`);
// });

// Exportar la conexión
module.exports = {
  conn: sequelize,
};
