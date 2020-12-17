import React from "react";
import styles from "./Body.module.scss";

function Body(props) {
  return <div className={styles.body}>{props.children}</div>;
}

export default Body;
