import sequelize from './db.js';

async function initDataBase() {
  try {
    await sequelize.sync({ force: false })
    console.log('db conectada');
  } catch (error) {
    console.log('Error en conexion con db', error);
  }
}

export default initDataBase

