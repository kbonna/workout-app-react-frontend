import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SignupForm.scss";

function SignupForm({ handleSignup, signupErrorMsg, setSignupErrorMsg }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  let history = useHistory();

  let errorSpan;
  if (!signupErrorMsg) {
    errorSpan = null;
  } else {
    errorSpan = (
      <>
        <span className="login-form__error">{signupErrorMsg}</span>
        <br></br>
      </>
    );
  }

  function isValidUsername(username) {
    if (!username) {
      setSignupErrorMsg("Please provide username");
      return false;
    } else if (username.length < 3) {
      setSignupErrorMsg("Username should be at least 3 characters long");
      return false;
    }
    return true;
  }

  function isValidPassword(password) {
    if (!password) {
      setSignupErrorMsg("Please provide password");
      return false;
    } else if (password.length < 4) {
      setSignupErrorMsg("Password should be at least 4 characters long");
      return false;
    }
    return true;
  }

  function isValidRepeatedPassword(password, repeatedPassword) {
    if (!repeatedPassword) {
      setSignupErrorMsg("Please repeat your password");
      return false;
    } else if (password !== repeatedPassword) {
      setSignupErrorMsg("Passwords are not matching");
      return false;
    }
    return true;
  }

  return (
    <div className="position-fixed-center">
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (
            isValidUsername(username) &&
            isValidPassword(password) &&
            isValidRepeatedPassword(password, repeatedPassword)
          ) {
            handleSignup(e, username, password, history);
          }
        }}
      >
        <h3 style={{ textAlign: "center" }}>Sign Up</h3>
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
        <label htmlFor="password">Repeat password</label>
        <br></br>
        <input
          type="password"
          name="repeatedPassword"
          value={repeatedPassword}
          onChange={(e) => {
            setRepeatedPassword(e.target.value);
          }}
        />
        <br></br>
        {errorSpan}
        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
}

export default SignupForm;
