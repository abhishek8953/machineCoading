import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/blogApp2")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Error:", err));

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
