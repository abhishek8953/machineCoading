import React from "react";

export default function CommentList({ comments }) {
  if (comments.length === 0) return <p className="text-gray-500">No comments yet</p>;
 console.log(comments);
  return (
    <div className="mt-4">
      <h3 className="font-bold mb-2">Comments:</h3>
      {comments.map((c,i) => (
        <div key={c._id+i} className="border p-2 rounded mb-2">
          <p className="text-gray-800">{c.content}</p>
          <p className="text-sm text-gray-500">By: {c.user?.name}</p>
        </div>
      ))}
    </div>
  );
}
