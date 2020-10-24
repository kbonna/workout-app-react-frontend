import React from "react";

function ExerciseTableHeader({ isDiscover }) {
  return (
    <tr className="exercise-table__header-row">
      <th className="exercise-table__header-cell">Name</th>
      <th className="exercise-table__header-cell">Type</th>
      {isDiscover ? (
        <th className="exercise-table__header-cell">Stars</th>
      ) : null}
      <th className="exercise-table__header-cell"></th>
    </tr>
  );
}

export default ExerciseTableHeader;
