import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const User = sequelize.define(
  "user",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    email: {
      type: DataTypes.TEXT(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.TEXT(50),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

let Task;

const configureAssociation = (taskModel) => {
  Task = taskModel;
  User.hasMany(Task);
};

// export { Autor, configureAssociation };
export { User, configureAssociation };
