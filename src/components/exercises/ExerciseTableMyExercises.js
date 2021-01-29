import React, { useState, useEffect } from "react";

import ExerciseTable from "./ExerciseTable";

import routes from "utilities/routes";
import { fetchExercises, deleteExercise } from "services/exercises";
import LinkButton from "components/reusable/LinkButton";
import Button from "components/reusable/Button";
import { useNotify } from "context/NotificationProvider";
import { useUser } from "context/UserProvider";

function ExerciseTableMyExercises({ exercisesFilterString }) {
  const [exercises, setExercises] = useState(null);
  const user = useUser();
  const notify = useNotify();

  const fetchData = () => {
    fetchExercises(user.pk).then((exercises) => {
      if (exercises.length) {
        setExercises(exercises);
      } else {
        setExercises([]);
      }
    });
  };

  useEffect(fetchData, []);

  function handleDelete(exercise) {
    deleteExercise(exercise.pk).then((success) => {
      if (success) {
        setExercises((prevExercises) =>
          prevExercises.filter((ex) => ex.pk !== exercise.pk)
        );
        notify({
          message: `Successfully deleted ${exercise.name} exercise.`,
          type: "success",
        });
      }
    });
  }

  let exercisesButtons = [];
  if (exercises) {
    exercisesButtons = exercises.map((exercise) => [
      <LinkButton
        key={"edit"}
        label={"Edit"}
        to={`${routes.app.exercises.exercise}${exercise.pk}/edit`}
        className="mx-1"
      ></LinkButton>,
      <Button
        key={"delete"}
        label={"Delete"}
        handleClick={() => handleDelete(exercise)}
        className="mx-1"
      ></Button>,
    ]);
  }

  return (
    <ExerciseTable
      columnNames={["Name", "Type", null]}
      exercises={exercises}
      exercisesButtons={exercisesButtons}
      exercisesFilterString={exercisesFilterString}
    ></ExerciseTable>
  );
}

export default ExerciseTableMyExercises;
