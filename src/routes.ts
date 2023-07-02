import { Router } from "express";

import AuthCotroller from "./app/controllers/AuthController";
import TodoController from "./app/controllers/TodoController";
import CategoryController from "./app/controllers/CategoryController";

const router = Router();

//Auth
router.post("/login", AuthCotroller.show);
router.post("/register", AuthCotroller.store);
router.post("/user/update", AuthCotroller.update);

//Categorie
router.get("/categories", CategoryController.show);
router.post("/category/create", CategoryController.store);
router.delete("/category/delete", CategoryController.delete);
router.put("/category/update", CategoryController.update);

//Tasks
router.get("/tasks", TodoController.show);
router.post("/task", TodoController.store);

export default router;
