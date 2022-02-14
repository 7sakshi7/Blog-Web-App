import React from "react";
import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyBlogs from "./pages/MyBlogs";
import About from "./pages/About";
import Publishblog from "./pages/PublishBlog";
import SingleBlog from "./pages/SingleBlog";
import UpdateBlog from "./pages/UpdateBlog";

function App() {
  const [nav, setnav] = useState(false);
  function updateNavbar() {
    const isAuth = nav;
    setnav(!isAuth);
  }
  return (
    <>
      <Navbar updateNavbar={updateNavbar} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/login"
          element={<Login updateNavbar={updateNavbar} />}
        />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/myblog" element={<MyBlogs />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/publishblog" element={<Publishblog />} />
        <Route exact path="/updateblog/:blogId" element={<UpdateBlog />} />
        <Route exact path="/:blogId" element={<SingleBlog />} />
      </Routes>
    </>
  );
}

export default App;
