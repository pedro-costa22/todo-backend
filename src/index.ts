import * as express from "express";
import router from "./routes";
import sequelize from "./database/dbConnection";

const app = express();
app.use(express.json());
app.use(router);

//Db
(async () => {
  //Models
  const Users = require("./models/User");
  const Tasks = require("./models/Tasks");
  const Category = require("./models/Category");

  await sequelize.sync();
})();
