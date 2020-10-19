import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoginForm.scss";

function LoginForm({ handleLogin, loginErrorMsg, setLoginErrorMsg }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  function isValidUsername(username) {
    if (!username) {
      setLoginErrorMsg("Please provide username.");
      return false;
    }
    return true;
  }

  function isValidPassword(password) {
    if (!password) {
      setLoginErrorMsg("Please provide password.");
      return false;
    }
    return true;
  }

  let errorSpan;
  if (!loginErrorMsg) {
    errorSpan = null;
  } else {
    errorSpan = (
      <>
        <span className="login-form__error">{loginErrorMsg}</span>
        <br></br>
      </>
    );
  }

  return (
    <div className="position-fixed-center">
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (isValidUsername(username) && isValidPassword(password)) {
            handleLogin(e, username, password, history);
          }
        }}
      >
        <h3 style={{ textAlign: "center" }}>Log In</h3>
        <label htmlFor="username">Username</label>
        <br></br>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br></br>
        <label htmlFor="password">Password</label>
        <br></br>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br></br>
        {errorSpan}
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default LoginForm;
