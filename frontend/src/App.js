import React from 'react';
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import {Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyBlogs from "./pages/MyBlogs";
import About from './pages/About';
import Publishblog from './pages/Publishblog';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/myblog" element={<MyBlogs />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/publishblog" element={<Publishblog />} />
      </Routes>
    </>
  );
}

export default App;
