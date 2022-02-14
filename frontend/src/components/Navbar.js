import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const user = localStorage.getItem("token");
  // console.log('user =',user);

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    props.updateNavbar();
  }
  
  return (
    <div
      className="container-fluid nav"
      style={{ position: "fixed", marginBottom: "1rem" }}
    >
      <div className="container row">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user !== null || props.isAuth ? (
            <>
              <li>
                <Link to="/about">About Me</Link>
              </li>
              <li>
                <Link to="/publishblog">Publish Blog</Link>
              </li>
              <li>
                <Link to="/myblog">My Blogs</Link>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
        <ul>
          {user !== null || props.isAuth ? (
            <>
              <li>
                <a href="/">Search</a>
              </li>
              <li style={{ cursor: "pointer" }} onClick={logOut}>
                Log Out
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
