import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createQuery, getAllQueries } from '../controllers/queries.js';

const router = Router();

// create query
// http://localhost:8080/api/queries
router.post('/', checkAuth, createQuery);

// get all queries
// http://localhost:8080/api/queries
router.get('/', getAllQueries);
export default router;