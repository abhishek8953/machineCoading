import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashbord.jsx";
import BlogDetail from "./pages/BlogDetails.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if(userData) setUser(JSON.parse(userData));
  }, []);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
        <Route path="/blogs/:id" element={user ? <BlogDetail user={user} /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}
