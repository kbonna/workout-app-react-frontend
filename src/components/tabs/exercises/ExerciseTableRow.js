import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function ExerciseTableRow({ exercise, handleDelete, handleEdit, handleFork }) {
  const { url } = useRouteMatch();
  let parentUrl = url.split("/").slice(0, -1).join("/");

  let buttons = [];
  if (typeof handleEdit !== "undefined") {
    buttons.push(
      <button
        onClick={() => {
          handleEdit(exercise.pk);
        }}
        className="btn mx-1"
        key={`button-edit-${exercise.pk}`}
      >
        Edit
      </button>
    );
  }
  if (typeof handleDelete !== "undefined") {
    buttons.push(
      <button
        onClick={() => {
          handleDelete(exercise.pk);
        }}
        className="btn"
        key={`button-delete-${exercise.pk}`}
      >
        Delete
      </button>
    );
  }
  if (typeof handleFork !== "undefined") {
    if (exercise.can_be_forked) {
      buttons.push(
        <button
          onClick={() => {
            handleFork(exercise.pk);
          }}
          className="btn"
          key={`button-fork-${exercise.pk}`}
        >
          Fork
        </button>
      );
    } else {
      buttons.push(
        <span className="exercise-table__span " key={`span-${exercise.pk}`}>
          You already own this
        </span>
      );
    }
  }

  let forksCountCell;
  if (typeof handleFork !== "undefined") {
    if (exercise.forks_count) {
      forksCountCell = (
        <td className="exercise-table__cell">{`${exercise.forks_count} ★`}</td>
      );
    } else {
      forksCountCell = <td className="exercise-table__cell">{"-"}</td>;
    }
  } else {
    forksCountCell = null;
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
      {forksCountCell}
      <td className="exercise-table__cell">{buttons}</td>
    </tr>
  );
}

export default ExerciseTableRow;
