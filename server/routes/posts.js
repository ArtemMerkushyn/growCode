import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createPost, getMyPosts,  } from '../controllers/posts.js';

const router = Router();

//create post
// http://localhost:8080/api/posts
router.post('/', checkAuth, createPost);

// Get My Posts
// http://localhost:3002/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts);

export default router;