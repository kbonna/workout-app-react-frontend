import React from "react";
import { classNames, zip } from "utilities/misc";
import styles from "./ListWithIcons.module.scss";

const ListWithIcons = ({ icons, labels, values, className }) => {
  const classList = classNames({
    [styles.List]: true,
    [className]: Boolean(className),
  });

  return (
    <ul className={classList}>
      {zip([icons, labels, values]).map(([icon, label, value], index) => (
        <li className={styles.List_listItem} key={index}>
          <div className={styles.List_listItemIconWrapper}>{icon}</div>
          <span className={styles.List_listItemLabel}>{label}</span>
          <span className={styles.List_listItemText}>{value}</span>
        </li>
      ))}
    </ul>
  );
};

export default ListWithIcons;
