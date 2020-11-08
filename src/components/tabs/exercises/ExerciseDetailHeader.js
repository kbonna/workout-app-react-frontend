import React from "react";
import styles from "./ExerciseDetailHeader.module.scss";

function ExerciseDetailHeader({ exerciseName, exerciseKind }) {
  let titleFontSize;
  if (exerciseName.length < 15) {
    titleFontSize = "2.25em";
  } else if (exerciseName.length < 25) {
    titleFontSize = "2em";
  } else {
    titleFontSize = "1.75em";
  }

  return (
    <div className={styles["header"]}>
      <p className={styles["header__subtitle"]}>exercise</p>
      <h1
        className={styles["header__title"]}
        style={{ fontSize: titleFontSize }}
      >
        {exerciseName}
      </h1>
      <h1 className={styles["header__kind"]}>{exerciseKind}</h1>
    </div>
  );
}

export default ExerciseDetailHeader;
