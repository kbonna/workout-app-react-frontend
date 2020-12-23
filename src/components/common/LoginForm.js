import React, { useState } from "react";
import { useAuth } from "context/AuthProvider";
import { useHistory } from "react-router-dom";
import routes from "utilities/routes";
import styles from "./LoginForm.module.scss";
import SimpleInput from "components/OLD_forms/SimpleInput";
import Button from "components/reusable/Button";

const fieldProps = {
  username: {
    title: "Username",
    name: "username",
    placeholder: "username",
    type: "text",
  },
  password: {
    title: "Password",
    name: "password",
    placeholder: "password",
    type: "password",
  },
};

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login } = useAuth();
  const history = useHistory();

  // TODO: move to validators
  function isValidUsername(username) {
    if (!username) {
      setUsernameError("Please provide username.");
      return false;
    }
    return true;
  }

  function isValidPassword(password) {
    if (!password) {
      setPasswordError("Please provide password.");
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");
    if (isValidUsername(username) && isValidPassword(password)) {
      login(username, password)
        .then((user) => {
          history.push(routes.app.exercises.myExercises);
        })
        .catch((error) => {
          setPasswordError(error.message);
        });
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Log in</h1>
      <fieldset className={styles.fieldset}>
        <SimpleInput
          className={styles.input}
          title={fieldProps.username.title}
          name={fieldProps.username.name}
          type={fieldProps.username.type}
          placeholder={fieldProps.username.placeholder}
          value={username}
          handleChange={handleUsernameChange}
          error={usernameError}
        ></SimpleInput>
        <SimpleInput
          className={styles.input}
          title={fieldProps.password.title}
          name={fieldProps.password.name}
          type={fieldProps.password.type}
          placeholder={fieldProps.password.placeholder}
          value={password}
          handleChange={handlePasswordChange}
          error={passwordError}
        ></SimpleInput>
      </fieldset>
      <div className={styles.buttons}>
        <Button
          className={styles["buttons__login"]}
          type="submit"
          buttonType="dark"
          handleClick={handleSubmit}
          label="Submit"
        ></Button>
      </div>
      <a className={styles.link} href={routes.signup}>
        Don't have an account yet?
      </a>
    </form>
  );
};

export default LoginForm;
