import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Task = sequelize.define("Task",{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title:{type:DataTypes.STRING, allowNull: false},
    description:{type:DataTypes.STRING,},
    status:{type:DataTypes.STRING, allowNull: false,defaultValue:"pending"},
   
});

User.hasMany
(Task,{
    foreignKey:"userId",
    as:"tasks"
});

Task.belongsTo(User,{
    foreignKey:"userId",
});

export default Task;