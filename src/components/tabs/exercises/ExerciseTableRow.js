import React from "react";
import { Link } from "react-router-dom";

import routes from "utilities/routes";
import styles from "./ExerciseTableRow.module.scss";

function ExerciseTableRow({ exercise, exerciseButtons, exerciseExtraColumns }) {
  return (
    <tr className={styles["row"]}>
      <td className={styles["row__cell"]}>
        <Link
          className={styles["row__link"]}
          to={`${routes.app.exercises.exercise}${exercise.pk}`}
        >
          {exercise.name}
        </Link>
      </td>
      <td className={styles["row__cell"]}>{exercise.kind_display}</td>
      {exerciseExtraColumns.map((value, idx) => (
        <td key={idx} className={styles["row__cell"]}>
          {value}
        </td>
      ))}
      <td className={styles["row__cell"]}>{exerciseButtons}</td>
    </tr>
  );
}

export default ExerciseTableRow;
