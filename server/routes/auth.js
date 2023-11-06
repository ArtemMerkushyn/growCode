import { Router } from "express";
import { login, register } from "../controllers/auth.js";

const router = new Router();

// register http://localhost:8080/api/auth/register
router.post('/register', register);

// register http://localhost:8080/api/auth/login
router.post('/login', login);

export default router;