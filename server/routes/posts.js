import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createPost, getMyPosts, getPostById, updatePost } from '../controllers/posts.js';

const router = Router();

//create post
// http://localhost:8080/api/posts
router.post('/', checkAuth, createPost);

// get My Posts
// http://localhost:3002/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts);

// get post by id
// http://localhost:3002/api/posts/:id
router.get('/:id', getPostById);

// update post
// http://localhost:3002/api/posts/:id
router.put('/:id', checkAuth, updatePost);

export default router;