import React from "react";
import { useState, useEffect } from "react";
import "../css/Login.css";
import {
  handleCreationSubmission,
  handleLoginSubmission,
  handleLogin,
} from "../Logic/LoginState";

import { auth } from "../firebase/firebase";
const Login = () => {
  const [showEle, setShowEle] = useState(-1);
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [loggedIn, setLoggedIn] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoggedIn(user == null ? "Login" : "Logout");
    });
  }, []);

  return (
    <>
      {showEle === -1 ? (
        <div
          className="login"
          onClick={() => handleLogin(loggedIn, setShowEle, setLoggedIn)}
        >
          {loggedIn}
        </div>
      ) : (
        <div className="login-form">
          <div className="login-fields">
            <button className="close" onClick={() => setShowEle(-1)}>
              ×
            </button>
            <h1 className="form-heading">Login/Sign-Up</h1>
            <form onSubmit={(e) => e.preventDefault()}>
              <h1>Email</h1>
              <input
                className="emailInput"
                placeholder="email"
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
              />
              <br />
              <br />
              <h1>Password</h1>
              <input
                className="passInput"
                placeholder="password"
                type="password"
                value={passValue}
                onChange={(e) => setPassValue(e.target.value)}
              />
              <br />
              <br />
              <div className="btn">
                <button
                  className="loginBtn"
                  onClick={(e) =>
                    handleLoginSubmission(
                      e,
                      setLoggedIn,
                      setShowEle,
                      setError,
                      emailValue,
                      passValue
                    )
                  }
                >
                  Login
                </button>
                <button
                  className="signBtn"
                  onClick={(e) =>
                    handleCreationSubmission(
                      e,
                      setLoggedIn,
                      setShowEle,
                      setError,
                      emailValue,
                      passValue
                    )
                  }
                >
                  Create Account
                </button>
              </div>
            </form>
            <div className="error">{error}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
