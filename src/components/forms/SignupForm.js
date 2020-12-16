import { useAuth } from "components/context/AuthProvider";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import routes from "utilities/routes";
import "./SignupForm.scss";

function SignupForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  let history = useHistory();

  function isValidUsername(username) {
    if (!username) {
      setError("Please provide username");
      return false;
    } else if (username.length < 3) {
      setError("Username should be at least 3 characters long");
      return false;
    }
    return true;
  }

  function isValidPassword(password) {
    if (!password) {
      setError("Please provide password");
      return false;
    } else if (password.length < 4) {
      setError("Password should be at least 4 characters long");
      return false;
    }
    return true;
  }

  function isValidRepeatedPassword(password, repeatedPassword) {
    if (!repeatedPassword) {
      setError("Please repeat your password");
      return false;
    } else if (password !== repeatedPassword) {
      setError("Passwords are not matching");
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      isValidUsername(username) &&
      isValidPassword(password) &&
      isValidRepeatedPassword(password, repeatedPassword)
    ) {
      signup(username, password)
        .then(() => {
          history.push(routes.app.self);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  return (
    <div className="position-fixed-center">
      <form className="login-form" onSubmit={handleSubmit}>
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
        {error ? (
          <>
            <span className="login-form__error">{error}</span>
            <br></br>
          </>
        ) : null}
        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
}

export default SignupForm;
