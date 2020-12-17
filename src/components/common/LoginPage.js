import React from "react";
import LoginForm from "./LoginForm";
import styles from "./LoginPage.module.scss";

function LoginPage(props) {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
