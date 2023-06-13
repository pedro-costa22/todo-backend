import { Sequelize } from "sequelize";

const sequelize = new Sequelize("todolist", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

export default sequelize;
