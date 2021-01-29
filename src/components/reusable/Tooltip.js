import React from "react";
import styles from "./Tooltip.module.scss";

const Tooltip = ({ message, children }) => {
  return (
    <div className={styles.div} data-message={message}>
      {children}
    </div>
  );
};

export default Tooltip;
