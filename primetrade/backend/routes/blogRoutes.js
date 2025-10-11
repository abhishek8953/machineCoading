import express from "express";
import { body, validationResult } from "express-validator";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import { auth } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Get all blogs
router.get("/", async (req, res, next) => {
  try {
    console.log("d");
    const query = req.query.search || "";

    // Case-insensitive title search
    const blogs = await Blog.find(
      query ? { title: { $regex: query, $options: "i" } } : {}
    ).populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    next(err);
  }
});


// Get single blog + comments
router.get("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    if(!blog) return res.status(404).json({ message: "Blog not found" });
    const comments = await Comment.find({ blog: blog._id }).populate("user", "name");
    res.json({ blog, comments });
  } catch(err) { next(err); }
});

// Add blog (Admin only)
router.post("/", auth, adminOnly,
  body("title").notEmpty().withMessage("Title required"),
  body("content").notEmpty().withMessage("Content required"),
  async (req, res, next) => {
    console.log("blog",req.body);
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const blog = new Blog({ ...req.body, author: req.user.id });
      await blog.save();
      res.json(blog);
    } catch(err) { next(err); }
  }
);

// Update blog (Admin only)
router.put("/:id", auth, adminOnly,
  body("title").notEmpty().withMessage("Title required"),
  body("content").notEmpty().withMessage("Content required"),
  async (req, res, next) => {
    try {
      const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if(!blog) return res.status(404).json({ message: "Blog not found" });
      res.json(blog);
    } catch(err) { next(err); }
  }
);

// Delete blog (Admin only)
router.delete("/:id", auth, adminOnly, async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if(!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch(err) { next(err); }
});

// Add comment (user)
router.post("/:id/comments", auth, async (req, res, next) => {
  try {
    const { content } = req.body;
    if(!content) return res.status(400).json({ message: "Comment cannot be empty" });
    const comment =  new Comment({ blog: req.params.id, user: req.user.id, content });
    await comment.save()

    const populatedComment = await comment.populate("user", "name");
   
    res.json(populatedComment);
  } catch(err) { next(err); }
});




export default router;
