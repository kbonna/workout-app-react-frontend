import React from "react";

function ExerciseTableHeader({ columnNames }) {
  return (
    <thead>
      <tr className="exercise-table__header-row">
        {columnNames.map((columnName, idx) => (
          <th className="exercise-table__header-cell" key={idx}>
            {columnName}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default ExerciseTableHeader;
