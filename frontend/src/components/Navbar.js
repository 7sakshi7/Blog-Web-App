import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const user = localStorage.getItem("session");
  return (
    <div className="container-fluid nav">
      <div className="container row">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Me</Link>
          </li>

          {/* {user !== null ? ( */}
            <>
              <li>
                <Link to="/publishblog">Publish Blog</Link>
              </li>
              <li>
                <Link to="/myblog">My Blogs</Link>
              </li>
            </>
          {/* ) : ( */}
            {/* "" */}
          {/* )} */}
        </ul>
        <ul>
          {user !== null ? (
            <>
              <li>
                <a href="/">Search</a>
              </li>
              <li>
                <a href="/">Log Out</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
