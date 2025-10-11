import Blog from '../models/Blog.js';

// Admin creates blog
export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, author: req.user._id });
    res.status(201).json(blog);
  } catch(err) { res.status(400).json({ message: err.message }); }
}

// Fetch blogs (any user)
export const getBlogs = async (req, res) => {
  const blogs = await Blog.find().populate('author', 'username').populate('comments.user', 'username');
  res.json(blogs);
}

// Admin updates blog
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!blog) return res.status(404).json({ message: 'Not Found' });
    res.json(blog);
  } catch(err) { res.status(400).json({ message: err.message }); }
}

// Admin deletes blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if(!blog) return res.status(404).json({ message: 'Not Found' });
    res.json({ message: 'Deleted successfully' });
  } catch(err) { res.status(400).json({ message: err.message }); }
}

// User adds comment
export const addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if(!blog) return res.status(404).json({ message: 'Blog not found' });
    blog.comments.push({ user: req.user._id, text: req.body.text });
    await blog.save();
    const populated = await blog.populate('comments.user', 'username');
    res.json(populated);
  } catch(err) { res.status(400).json({ message: err.message }); }
}
