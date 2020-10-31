import React, { useState } from "react";
import ExerciseTableNav from "./ExerciseTableNav";
import ExerciseTable from "./ExerciseTable";

function ExerciseTablePage() {
  const [exercisesFilterString, setExercisesFilterString] = useState("");

  return (
    <>
      <ExerciseTableNav
        setExercisesFilterString={setExercisesFilterString}
      ></ExerciseTableNav>
      <ExerciseTable
        exercisesFilterString={exercisesFilterString}
      ></ExerciseTable>
    </>
  );
}

export default ExerciseTablePage;
