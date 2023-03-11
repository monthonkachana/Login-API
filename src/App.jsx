import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";



import Login from "./conponents/Login";
import Profile from "./conponents/Profile";
import Register from "./conponents/Register";

function App() {
  return (
    <div>
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
