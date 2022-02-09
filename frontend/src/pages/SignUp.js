import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  let history = useNavigate();

  async function signup() {
    const user = {
      username,
      email,
      password,
    };
    const res = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const createdUser = await res.json();
    console.log(createdUser);
    history("/login");
  }
  return (
    <>
      <div className="signup_image image">
        <div className="signup_box auth_box">
          <h1>SIGN UP</h1>
          <div className="input_group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              aria-describedby="emailHelp"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input_group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input_group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              aria-describedby="emailHelp"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input_group">
            <label htmlFor="confirmpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              aria-describedby="emailHelp"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <div className="input_group">
            <label htmlFor="confirmpassword" className="form-label">
              Choose Your Profile Picture
            </label>
            <input
              type="file"
              id="confirmpassword"
              name="confirmpassword"
              aria-describedby="emailHelp"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div> */}
          <button className="login_btn signup_btn" onClick={signup}>
            SIGN UP!
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
