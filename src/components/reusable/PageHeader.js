import React from "react";
import styles from "./PageHeader.module.scss";

const PageHeader = ({ category, title, subtitle }) => {
  return (
    <div className={styles.header}>
      <p className={styles.headerCategory}>{category}</p>
      <h1 className={styles.headerTitle}>{title}</h1>
      <p className={styles.headerSubtitle}>{subtitle}</p>
    </div>
  );
};

export default PageHeader;
