import { DataTypes } from "sequelize";
import sequelize from "../database/dbConnection";

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

export default Category;
