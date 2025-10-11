import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import BlogCard from "../components/BlogCard.jsx";
import BlogForm from "../components/BlogForm.jsx";

export default function Dashboard({ user }) {
  const [blogs, setBlogs] = useState([]);
   console.log(user);
  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs(blogs.filter(b => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (data) => {
    try {
      const res = await api.post("/blogs", data);
      setBlogs([res.data, ...blogs]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-4">
      {user.role === "admin" && <BlogForm onSubmit={handleAdd} />}
      {blogs.map(blog => (
        <BlogCard key={blog._id} blog={blog} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
}
