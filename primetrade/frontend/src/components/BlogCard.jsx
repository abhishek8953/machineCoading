import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ blog, user, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-700 mb-2">{blog.content.slice(0, 100)}...</p>
      <p className="text-sm text-gray-500">By: {blog.author.name}</p>
      <div className="mt-2 flex space-x-2">
        <Link to={`/blogs/${blog._id}`} className="text-blue-600">View</Link>
        {user.role === "admin" && (
          <>
            <button onClick={() => onDelete(blog._id)} className="text-red-500">Delete</button>
          </>
        )}
      </div>
    </div>
  );
}
