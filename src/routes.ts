import { Router } from "express";

import AuthCotroller from "./app/controllers/AuthController";
import TodoController from "./app/controllers/TodoController";
import CategoryController from "./app/controllers/CategoryController";

const router = Router();

//Auth
router.post("/login", AuthCotroller.show);
router.post("/register", AuthCotroller.store);
router.post("/user/:id", AuthCotroller.update);

//Categorie
router.get("/categories", CategoryController.show);
router.post("/category", CategoryController.store);
router.delete("/category/:id", CategoryController.delete);
router.put("/category/:id", CategoryController.update);

//Tasks
router.get("/tasks", TodoController.show);
router.post("/task", TodoController.store);
router.put("/task/:id", TodoController.update);
router.delete("/task/:id", TodoController.delete);

export default router;
