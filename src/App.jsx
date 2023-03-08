import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";

import Login from "./conponents/Login";
import Profile from "./conponents/Profile";
import Register from "./conponents/Register";

function App() {
  return (
    <div>
      <Link to="/">
        <h1>Home</h1>
      </Link>
      <Link to="/login">
        <h1>Login</h1>
      </Link>
      <Link to="/profile">
        <h1>Profile</h1>
      </Link>
      <Link to="/register">
        <h1>Register</h1>
      </Link>
      <br />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
