import React, { useState } from "react";
import ExerciseTableNav from "./ExerciseTableNav";
import ExerciseTable from "./ExerciseTable";
import ExerciseTableError from "./ExerciseTableError";
import Spinner from "icons/Spinner";

function ExerciseTablePage({
  exercises,
  handleEdit,
  handleDelete,
  handleFork,
}) {
  const [exercisesFilterString, setExercisesFilterString] = useState("");

  const filterExercises = (exercises, exercisesFilterString) => {
    return exercises.filter((exercise) => {
      if (!exercisesFilterString) {
        return true;
      } else if (exercise.name.includes(exercisesFilterString)) {
        return true;
      } else {
        return false;
      }
    });
  };

  let exerciseTableContent;
  if (exercises === null) {
    exerciseTableContent = (
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <Spinner></Spinner>
      </div>
    );
  } else if (exercises.length) {
    exerciseTableContent = (
      <ExerciseTable
        exercises={filterExercises(exercises, exercisesFilterString)}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleFork={handleFork}
      ></ExerciseTable>
    );
  } else {
    exerciseTableContent = <ExerciseTableError></ExerciseTableError>;
  }

  return (
    <>
      <ExerciseTableNav
        setExercisesFilterString={setExercisesFilterString}
      ></ExerciseTableNav>
      {exerciseTableContent}
    </>
  );
}

export default ExerciseTablePage;
