import React, { useState, useEffect } from "react";

import { fetchExercises, forkExercise } from "services/Exercises";
import Button from "components/reusable/Button";
import ExerciseTable from "./ExerciseTable";
import { useNotify } from "context/NotificationProvider";
import { useUser } from "context/UserProvider";

function ExerciseTableDiscover({ exercisesFilterString, nExercisesPerPage }) {
  const [exercises, setExercises] = useState(null);
  const user = useUser();
  const notify = useNotify();

  const fetchData = () => {
    fetchExercises(user.pk, true).then((exercises) => {
      if (exercises.length) {
        setExercises(exercises);
      } else {
        setExercises([]);
      }
    });
  };

  useEffect(fetchData, []);

  function handleFork(exercise) {
    console.log("forking", exercise);
    forkExercise(exercise.pk).then((success) => {
      if (success) {
        setExercises(null);
        fetchData();
        console.log("notify", exercise);

        notify({
          message: `Successfully forked ${exercise.name} exercise.`,
          type: "success",
        });
      } else {
        notify({
          message: `Cannot fork ${exercise.name} exercise.`,
          type: "error",
        });
      }
    });
  }

  let exercisesButtons = [];
  let exercisesExtraColumns = [];
  if (exercises) {
    exercisesButtons = exercises.map((exercise) => [
      !exercise.can_be_forked ? (
        <span className={"error"} key={`span-${exercise.pk}`}>
          You already own this
        </span>
      ) : (
        <Button
          key={"fork"}
          label={"Fork"}
          handleClick={() => handleFork(exercise)}
          className="mx-1"
        ></Button>
      ),
    ]);
    exercisesExtraColumns = exercises.map((exercise) => [
      exercise.forks_count ? `${exercise.forks_count} ★` : "-",
    ]);
  }

  return (
    <ExerciseTable
      columnNames={["Name", "Type", "Stars", null]}
      exercises={exercises}
      exercisesButtons={exercisesButtons}
      exercisesExtraColumns={exercisesExtraColumns}
      exercisesFilterString={exercisesFilterString}
    ></ExerciseTable>
  );
}

export default ExerciseTableDiscover;
