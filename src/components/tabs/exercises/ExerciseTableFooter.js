import React from "react";
import ExerciseTableNav from "./ExerciseTableNav";
import styles from "./ExerciseTableFooter.module.scss";

function ExerciseTableFooter({
  currentPage,
  nPages,
  decrementPage,
  incrementPage,
  nExercises,
  firstExerciseIndex,
  lastExerciseIndex,
  nColumns,
}) {
  return (
    <tfoot className={styles["footer"]}>
      <tr className={styles["footer__row"]}>
        <td className={styles["footer__cell"]}>
          <ExerciseTableNav
            currentPage={currentPage}
            nPages={nPages}
            incrementPage={incrementPage}
            decrementPage={decrementPage}
          ></ExerciseTableNav>
        </td>
        {[...Array(nColumns - 2).keys()].map((colIdx) => (
          <td
            key={`extra-column-${colIdx}`}
            className={styles["footer__cell"]}
          ></td>
        ))}
        <td className={styles["footer__cell"]}>{`${
          firstExerciseIndex + 1
        }-${lastExerciseIndex} out of ${nExercises} exercises`}</td>
      </tr>
    </tfoot>
  );
}

export default ExerciseTableFooter;
