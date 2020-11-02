import React from "react";
import ExerciseTableRow from "./ExerciseTableRow";

function ExerciseTableBody({ exercises, ...actions }) {
  return (
    <tbody>
      {exercises.map((exercise, idx) => (
        <ExerciseTableRow
          key={exercise.pk}
          exercise={exercise}
          {...actions}
        ></ExerciseTableRow>
      ))}
    </tbody>
  );
}

export default ExerciseTableBody;
