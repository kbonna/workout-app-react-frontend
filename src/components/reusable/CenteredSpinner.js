import React from "react";
import Spinner from "./Spinner";
import styles from "./CenteredSpinner.module.scss";
import { useFlags } from "context/FlagsProvider";
const CenteredSpinner = () => {
  const [{ isSidebarOpen }, _] = useFlags();
  console.log(isSidebarOpen);

  return (
    <div className={styles.spinnerWrapper}>
      <Spinner></Spinner>
    </div>
  );
};

export default CenteredSpinner;
