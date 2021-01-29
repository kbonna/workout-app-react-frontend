import React from "react";
import styles from "./Box.module.scss";

const Box = ({ className, children }) => {
  return <div className={`${className} ${styles.box}`}>{children}</div>;
};

export default Box;
