import { DataTypes } from "sequelize";
import sequelize from "../../database.js";
import { User, configureAssociation } from "../../user/models/user.model.js";

const Task = sequelize.define(
  "task",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    title: {
      type: DataTypes.TEXT(50),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    status: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
  }
);

configureAssociation(Task);

Task.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

export { Task };
