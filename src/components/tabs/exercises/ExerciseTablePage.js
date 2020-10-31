import React, { useState } from "react";
import ExerciseTableNav from "./ExerciseTableNav";
import ExerciseTable from "./ExerciseTable";

function ExerciseTablePage({ url }) {
  const [exercisesFilterString, setExercisesFilterString] = useState("");

  return (
    <>
      <ExerciseTableNav
        setExercisesFilterString={setExercisesFilterString}
      ></ExerciseTableNav>
      <ExerciseTable
        exercisesFilterString={exercisesFilterString}
        url={url}
      ></ExerciseTable>
    </>
  );
}

export default ExerciseTablePage;
