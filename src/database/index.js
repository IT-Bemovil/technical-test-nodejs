import {Sequelize,DataTypes} from 'sequelize'

export const sequelizeConnection = new Sequelize('dev_db','user_dev','pass_dev',{
  dialect: 'sqlite',
  storage: 'dev.db'
})

