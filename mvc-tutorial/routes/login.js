import express from "express";

import { registerView } from "../controllers/loginController.js";
import { loginView } from "../controllers/loginController.js";
import { registerUser } from "../controllers/registerUser.js";

export const router = express.Router();

router.get('/register', registerView);
router.get('/login', loginView);
