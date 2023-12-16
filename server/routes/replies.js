import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createReply } from "../controllers/replies.js";

const router = new Router();

// create reply
// http://localhost:8080/api/replies/:id
router.post('/:id', checkAuth, createReply);

export default router;