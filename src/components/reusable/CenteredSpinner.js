import React from "react";
import Spinner from "./Spinner";
import styles from "./CenteredSpinner.module.scss";

const CenteredSpinner = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <Spinner></Spinner>
    </div>
  );
};

export default CenteredSpinner;
