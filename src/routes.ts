import { Router } from "express";

import AuthCotroller from "./app/controllers/AuthController";
import TodoController from "./app/controllers/TodoController";

const router = Router();

router.post("/login", AuthCotroller.show);
router.post("/register", AuthCotroller.store);

export default router;
