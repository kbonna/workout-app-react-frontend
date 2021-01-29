import React from "react";
import styles from "./Paragraph.module.scss";

const Paragraph = ({ title, content, className = "" }) => {
  return (
    <div className={className}>
      <h2 className={styles.h2}>{title}</h2>
      <p className={styles.p}>{content}</p>
    </div>
  );
};

export default Paragraph;
