import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import BlogCard from "../components/BlogCard.jsx";
import BlogForm from "../components/BlogForm.jsx";

export default function Dashboard({ user }) {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch blogs with optional search
  const fetchBlogs = async (query = "") => {
    try {
      const res = await api.get(`/blogs?search=${query}`);
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Real-time search with debounce (waits 500ms after typing)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchBlogs(searchQuery);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
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
    <div className="max-w-3xl mx-auto mt-4 px-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search blogs by title..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Admin Create Form */}
      {user.role === "admin" && (
        <div className="mb-6">
          <BlogForm onSubmit={handleAdd} />
        </div>
      )}

      {/* Blog List */}
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            user={user}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 mt-6">No blogs found.</p>
      )}
    </div>
  );
}
