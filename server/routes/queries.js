import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createQuery, getAllQueries, getMyQueries, getQueryById, getUserQueries, updateQuery } from '../controllers/queries.js';

const router = Router();

// create query
// http://localhost:8080/api/queries
router.post('/', checkAuth, createQuery);

// get all queries
// http://localhost:8080/api/queries
router.get('/', getAllQueries);
export default router;

// get my queries
// http://localhost:8080/api/queries/user/me
router.get('/user/me', checkAuth, getMyQueries);

// get user queries
// http://localhost:8080/api/queries/:id/queries
router.get('/:id/queries', getUserQueries);

// get query by id
// http://localhost:8080/api/queries/:id
router.get('/:id', getQueryById);

// update query
// http://localhost:8080/api/queries/:id
router.put('/:id', checkAuth, updateQuery);