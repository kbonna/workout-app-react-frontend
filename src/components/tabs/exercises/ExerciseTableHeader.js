import React from "react";
import styles from "./ExerciseTableHeader.module.scss";

function ExerciseTableHeader({ columnNames }) {
  return (
    <thead className={styles["header"]}>
      <tr className={styles["header__row"]}>
        {columnNames.map((columnName, idx) => (
          <th className={styles["header__cell"]} key={idx}>
            {columnName}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default ExerciseTableHeader;
