import express from 'express';
import { createBlog, getBlogs, updateBlog, deleteBlog, addComment } from '../controller/blogController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/', getBlogs);
router.post('/:id/comment', addComment);

// Admin-only routes
router.post('/', adminMiddleware, createBlog);
router.put('/:id', adminMiddleware, updateBlog);
router.delete('/:id', adminMiddleware, deleteBlog);

export default router;
