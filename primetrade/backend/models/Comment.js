import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Comment", CommentSchema);
