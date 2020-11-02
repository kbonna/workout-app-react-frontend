import React from "react";
import ExerciseTableNav from "./ExerciseTableNav";

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
    <tfoot>
      <tr className="exercise-table__footer-row">
        <td className="exercise-table__footer-cell">
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
            className="exercise-table__footer-cell"
          ></td>
        ))}
        <td className="exercise-table__footer-cell">{`${
          firstExerciseIndex + 1
        }-${lastExerciseIndex} out of ${nExercises} exercises`}</td>
      </tr>
    </tfoot>
  );
}

export default ExerciseTableFooter;
