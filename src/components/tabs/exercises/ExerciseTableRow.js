import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import "./ExerciseTableRow.scss";

function ExerciseTableRow({ exercise }) {
  const { url } = useRouteMatch();
  let parentUrl = url.split("/").slice(0, -1).join("/");

  return (
    <tr className="exercise-table__row">
      <td className="exercise-table__cell">
        <Link
          className="exercise-table__link"
          to={`${parentUrl}/exercise/${exercise.pk}`}
        >
          {exercise.name}
        </Link>
      </td>
      <td className="exercise-table__cell">{exercise.kind_display}</td>
      <td className="exercise-table__cell">
        <button className="btn mx-1">Edit</button>
        <button className="btn">Delete</button>
      </td>
    </tr>
  );
}

export default ExerciseTableRow;
