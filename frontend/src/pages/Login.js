import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useNavigate();

  async function login() {
    const user = { email, password };
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed");
        }

        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Could Not authenticate");
        }

        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        props.updateNavbar();
        history("/", { isAuth: true });
      })
      .catch((err) => {
        console.log(err);
      });

    // const loggedUser = await res.json();
    // console.log(loggedUser.authToken);
    // localStorage.setItem("session", JSON.stringify(loggedUser.authToken));
  }
  return (
    <>
      <div className="login_image image">
        <div className="login_box auth_box">
          <h1>LOGIN</h1>
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
          <button className="login_btn" onClick={login}>
            LOGIN!
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
