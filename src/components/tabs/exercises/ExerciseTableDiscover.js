import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "components/App";
import { fetchExercises, forkExercise } from "services/Exercises";
import Button from "components/reusable/Button";
import ExerciseTable from "./ExerciseTable";
import { useNotification } from "components/context/NotificationProvider";

function ExerciseTableDiscover({ exercisesFilterString, nExercisesPerPage }) {
  const [exercises, setExercises] = useState(null);
  const { userId } = useContext(UserContext);
  const notify = useNotification();

  const fetchData = () => {
    if (userId) {
      fetchExercises(userId, true).then((exercises) => {
        if (exercises.length) {
          setExercises(exercises);
        } else {
          setExercises([]);
        }
      });
    }
  };

  useEffect(fetchData, [userId]);

  function handleFork(exercise) {
    forkExercise(exercise.pk).then((success) => {
      if (success) {
        setExercises(null);
        fetchData();
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
          extraClasses="mx-1"
        ></Button>
      ),
    ]);
    exercisesExtraColumns = exercises.map((exercise) => [
      exercise.forks_count ? `${exercise.forks_count} ★` : "-",
    ]);
  }

  return (
    <ExerciseTable
      columnNames={["Name", "Type", null, null]}
      exercises={exercises}
      exercisesButtons={exercisesButtons}
      exercisesExtraColumns={exercisesExtraColumns}
      exercisesFilterString={exercisesFilterString}
    ></ExerciseTable>
  );
}

export default ExerciseTableDiscover;
