import { DataTypes } from "sequelize";
import sequelize from "../database/dbConnection";
import User from "./User";
import Category from "./Category";

const Tasks = sequelize.define("tasks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM(
      "created",
      "in-progress",
      "paused",
      "completed",
      "canceled"
    ),
    defaultValue: "created"
  }
});

User.hasMany(Tasks);
Tasks.belongsTo(User);

Category.hasMany(Tasks);
Tasks.belongsTo(Category);

export default Tasks;
