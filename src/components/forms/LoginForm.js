import { useAuth } from "components/context/AuthProvider";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import routes from "utilities/routes";
import "./LoginForm.scss";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const history = useHistory();

  function isValidUsername(username) {
    if (!username) {
      setError("Please provide username.");
      return false;
    }
    return true;
  }

  function isValidPassword(password) {
    if (!password) {
      setError("Please provide password.");
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidUsername(username) && isValidPassword(password)) {
      login(username, password)
        .then((user) => {
          // change location
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  return (
    <div className="position-fixed-center">
      <form className="login-form" onSubmit={handleSubmit}>
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
        <span className="login-form__error">{error}</span>
        <br></br>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
