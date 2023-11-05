import { Router } from "express";
import { register } from "../controllers/auth.js";

const router = new Router();

// register http://localhost:8080/api/auth/register
router.post('/register', register);

export default router;