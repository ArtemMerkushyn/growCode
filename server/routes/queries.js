import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createQuery } from '../controllers/queries.js';

const router = Router();

//create post
// http://localhost:8080/api/queries
router.post('/', checkAuth, createQuery);

export default router;