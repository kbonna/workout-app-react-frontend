import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { header_with_token } from "services/Auth";
import { API_URL } from "components/App";

function ExerciseTableRow({ exercise }) {
  const { url } = useRouteMatch();
  let parentUrl = url.split("/").slice(0, -1).join("/");

  function handleDelete(e) {
    fetch(`${API_URL}/exercises/${exercise.pk}`, {
      method: "delete",
      headers: header_with_token(),
    }).then((res) => {
      console.log(res);
      res.json().then((json) => console.log(json));
    });
  }

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
        <button onClick={handleDelete} className="btn">
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ExerciseTableRow;
