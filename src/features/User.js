import {  DataTypes } from 'sequelize'
import { sequelizeConnection } from '../database/index.js';

export const User = sequelizeConnection
.define(
  'User',
  {
    id:       {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:false},
    email:    {type:DataTypes.STRING,unique:true},
    password: {type:DataTypes.STRING}
  },
  {
    tableName: 'User',
  },
);