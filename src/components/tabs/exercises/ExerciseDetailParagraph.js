import React from "react";
import styles from "./ExerciseDetailParagraph.module.scss";

function ExerciseDetailParagraph({ title, content }) {
  return (
    <div className={styles["paragraph"]}>
      <h2 className={styles["paragraph__title"]}>{title}</h2>
      <p className={styles["paragraph__content"]}>
        {content || (
          <span className={styles["paragraph__content--error"]}>
            Not defined yet
          </span>
        )}
      </p>
    </div>
  );
}

export default ExerciseDetailParagraph;
