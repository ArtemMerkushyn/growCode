import { Router } from "express";
import { getAllUsers, getMe, login, register, updateUser } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// get all usershttp://localhost:8080/api/auth/users
router.get('/users', getAllUsers);

// register http://localhost:8080/api/auth/register
router.post('/register', register);

// register http://localhost:8080/api/auth/login
router.post('/login', login);

// get me http://localhost:8080/api/auth/me
router.get('/me', checkAuth, getMe);

// update user http://localhost:8080/api/auth/:id
router.put('/:id', checkAuth, updateUser);

export default router;