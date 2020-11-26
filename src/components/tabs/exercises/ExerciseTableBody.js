import React from "react";
import ExerciseTableRow from "./ExerciseTableRow";
import PropTypes from "prop-types";

function ExerciseTableBody({
  exercises,
  exercisesButtons,
  exercisesExtraColumns,
}) {
  return (
    <tbody>
      {exercises.map((exercise, idx) => (
        <ExerciseTableRow
          key={exercise.pk}
          exercise={exercise}
          exerciseButtons={exercisesButtons[idx]}
          exerciseExtraColumns={
            exercisesExtraColumns ? exercisesExtraColumns[idx] : []
          }
        ></ExerciseTableRow>
      ))}
    </tbody>
  );
}

ExerciseTableBody.defaultProps = {
  exercisesExtraColumns: false,
};

ExerciseTableBody.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object),
  exercisesButtons: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.element)),
  exercisesExtraColumns: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  ]),
};

export default ExerciseTableBody;
