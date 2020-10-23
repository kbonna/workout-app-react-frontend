import React from "react";

function ExerciseTableHeader({ handleFork }) {
  let extra_cell;
  if (typeof handleFork === "undefined") {
    // my-exercises tab
    extra_cell = null;
  } else {
    // discover tab
    extra_cell = <th className="exercise-table__header-cell">Stars</th>;
  }

  return (
    <tr className="exercise-table__header-row">
      <th className="exercise-table__header-cell">Name</th>
      <th className="exercise-table__header-cell">Type</th>
      {extra_cell}
      <th className="exercise-table__header-cell"></th>
    </tr>
  );
}

export default ExerciseTableHeader;
