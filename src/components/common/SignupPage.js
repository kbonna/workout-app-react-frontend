import React from "react";
import SignupForm from "./SignupForm";
import styles from "./SignupPage.module.scss";

function SignupPage(props) {
  return (
    <div className={styles.container}>
      <SignupForm />
    </div>
  );
}

export default SignupPage;
