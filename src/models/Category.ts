import { DataTypes } from "sequelize";
import sequelize from "../database/dbConnection";
import Tasks from "./Tasks";

const Category = sequelize.define("category", {
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
  }
});

Category.hasMany(Tasks);
Tasks.belongsTo(Category);

export default Category;
