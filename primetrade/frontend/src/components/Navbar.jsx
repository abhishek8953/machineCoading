import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/dashboard" className="font-bold text-xl">BlogApp</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <span>{user.name} ({user.role})</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
