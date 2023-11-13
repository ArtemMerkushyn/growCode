import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createPost, getAllPosts, getMyPosts, getPostById, getUserPosts, updatePost } from '../controllers/posts.js';

const router = Router();

//create post
// http://localhost:8080/api/posts
router.post('/', checkAuth, createPost);

// get My Posts
// http://localhost:8080/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts);

// get user posts
// http://localhost:8080/api/posts/:id/posts
router.get('/:id/posts', getUserPosts);

// get post by id
// http://localhost:8080/api/posts/:id
router.get('/:id', getPostById);

// update post
// http://localhost:8080/api/posts/:id
router.put('/:id', checkAuth, updatePost);

// get all post
// http://localhost:8080/api/posts
router.get('/', getAllPosts);

export default router;