import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";
import CommentList from "../components/CommentList.jsx";

export default function BlogDetail({ user }) {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/blogs/${id}`);
      setBlog(res.data.blog);
      setComments(res.data.comments);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchBlog(); }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!content) return;
    try {
      const res = await api.post(`/blogs/${id}/comments`, { content });
      setComments([...comments, res.data]);
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!blog) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-4 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-700 mb-2">{blog.content}</p>
      <p className="text-sm text-gray-500 mb-4">By: {blog.author.name}</p>

      <CommentList comments={comments} />

      {user.role === "user" && (
        <form onSubmit={handleComment} className="mt-4">
          <textarea
            placeholder="Add a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Comment
          </button>
        </form>
      )}
    </div>
  );
}
