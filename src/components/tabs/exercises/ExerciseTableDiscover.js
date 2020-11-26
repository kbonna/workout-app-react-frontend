import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "components/App";
import { fetchExercises } from "services/Exercises";
import { header_with_token } from "services/Auth";
import routes from "utilities/routes";
import Button from "components/reusable/Button";
import ExerciseTable from "./ExerciseTable";

function ExerciseTableDiscover({ exercisesFilterString, nExercisesPerPage }) {
  const [exercises, setExercises] = useState(null);
  const { userId } = useContext(UserContext);

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

  // TODO: move into servives
  function handleFork(exerciseId) {
    fetch(`${routes.api.exercises.self}${exerciseId}`, {
      method: "post",
      headers: header_with_token(),
    }).then((res) => {
      console.log(res);
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
          handleClick={() => handleFork(exercise.pk)}
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
