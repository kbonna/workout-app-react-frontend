import React from "react";
import { classNames } from "utilities/misc";
import styles from "./PageHeader.module.scss";

const PageHeader = ({ category, title, subtitle, className }) => {
  const classList = classNames({
    [styles.header]: true,
    [className]: className !== undefined,
  });
  return (
    <div className={classList}>
      <p className={styles.headerCategory}>{category}</p>
      <h1 className={styles.headerTitle}>{title}</h1>
      <p className={styles.headerSubtitle}>{subtitle}</p>
    </div>
  );
};

export default PageHeader;
