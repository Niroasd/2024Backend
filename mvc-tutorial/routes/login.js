import express from "express";

import { registerView } from "../controllers/loginController.js";
import { loginView } from "../controllers/loginController.js";
import { registerUser } from "../controllers/registerUser.js";
import { loginUser } from "../controllers/loginController.js";
import { protectRoute } from "../auth/protect.js";
import { dashboardView } from "../controllers/dashboardController.js";

export const router = express.Router();

router.get('/register', registerView);
router.get('/login', loginView);
router.get("/dashboard", protectRoute, dashboardView);

router.post('/register', registerUser);
router.post('/login', loginUser);