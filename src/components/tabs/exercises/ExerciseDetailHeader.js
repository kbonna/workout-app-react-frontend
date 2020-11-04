import React from "react";

function ExerciseDetailHeader({ exerciseName, exerciseKind }) {
  return (
    <div className="exercise-detail-header">
      <p className="exercise-detail-header__subtitle">exercise</p>
      <h1 className="exercise-detail-header__title">{exerciseName}</h1>
      <h1 className="exercise-detail-header__kind">{exerciseKind}</h1>
    </div>
  );
}

export default ExerciseDetailHeader;
