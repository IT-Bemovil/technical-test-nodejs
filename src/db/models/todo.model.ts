import { Sequelize, DataTypes, Model } from "sequelize";

module.exports = (sequelize: Sequelize) => {
  class Todo extends Model {
    static associate(models: any) {
      Todo.belongsTo(models.user);
    }
  }

  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
    },
    {
      sequelize,
      modelName: "todo",
    }
  );

  Todo.sync({ alter: true, logging: false });

  return Todo;
};
