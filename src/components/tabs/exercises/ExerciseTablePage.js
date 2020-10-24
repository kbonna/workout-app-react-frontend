import React from "react";
import ExerciseTableNav from "./ExerciseTableNav";
import ExerciseTable from "./ExerciseTable";
import ExerciseTableError from "./ExerciseTableError";

function ExerciseTablePage({
  exercises,
  handleEdit,
  handleDelete,
  handleFork,
  setExercisesFilterString,
}) {
  return (
    <>
      <ExerciseTableNav
        setExercisesFilterString={setExercisesFilterString}
      ></ExerciseTableNav>
      {exercises.length ? (
        <ExerciseTable
          exercises={exercises}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleFork={handleFork}
        ></ExerciseTable>
      ) : (
        <ExerciseTableError></ExerciseTableError>
      )}
    </>
  );
}

export default ExerciseTablePage;
