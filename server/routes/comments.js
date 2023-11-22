import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createComment, getAllComments, removeComment } from '../controllers/comments.js';

const router = new Router();

// create comment
// http://localhost:8080/api/comments/:id
router.post('/:id', checkAuth, createComment);

// remove comment
// http://localhost:8080/api/comments/:id
router.delete('/:id', checkAuth, removeComment);

// get all comments http://localhost:8080/api/comments
router.get('/', getAllComments);

export default router;