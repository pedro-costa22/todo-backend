import { Router } from "express";

import AuthCotroller from "./app/controllers/AuthController";
import TodoController from "./app/controllers/TodoController";
import CategoryController from "./app/controllers/CategoryController";

const router = Router();

router.post("/login", AuthCotroller.show);
router.post("/register", AuthCotroller.store);

router.get("/categories", CategoryController.show);
router.post("/category/create", CategoryController.store);

export default router;
