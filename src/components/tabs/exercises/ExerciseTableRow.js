import React from "react";
import { Link } from "react-router-dom";
import routes from "utilities/routes";

function ExerciseTableRow({ exercise, ...actions }) {
  const buttons = Object.keys(actions).map((actionName) => {
    if (actionName === "handleFork" && !exercise.can_be_forked) {
      return (
        <span className="exercise-table__span " key={`span-${exercise.pk}`}>
          You already own this
        </span>
      );
    }
    return (
      <button
        className="btn mx-1"
        onClick={() => actions[actionName](exercise.pk)}
        key={`${actionName}-${exercise.pk}`}
      >
        {actionName.replace("handle", "")}
      </button>
    );
  });

  return (
    <tr className="exercise-table__row">
      <td className="exercise-table__cell">
        <Link
          className="exercise-table__link"
          to={`${routes.app.exercises.exercise}/${exercise.pk}`}
        >
          {exercise.name}
        </Link>
      </td>
      <td className="exercise-table__cell">{exercise.kind_display}</td>
      {actions.hasOwnProperty("handleFork") ? (
        <td className="exercise-table__cell">
          {exercise.forks_count ? `${exercise.forks_count} ★` : "-"}
        </td>
      ) : null}
      <td className="exercise-table__cell">{buttons}</td>
    </tr>
  );
}

export default ExerciseTableRow;
