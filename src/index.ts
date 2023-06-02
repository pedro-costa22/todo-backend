import * as express from "express";
import { conn } from "./dbConnection";
import router from "./routes";

const app = express();

// app.use(express.json());
app.use(router);

//Initial server
conn.connect((err: any) => {
  if (err) {
    return console.log(err);
  }

  console.log("Conectou ao MySQL!");

  app.listen(3000, () => {
    console.log("server rodando na porta 3000");
  });
});
