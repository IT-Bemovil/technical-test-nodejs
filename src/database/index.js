import {Sequelize,DataTypes} from 'sequelize'

export const sequelizeConnection = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
  dialect: 'sqlite',
  storage: 'dev.db'
})

