import React, { useState, useEffect, useContext } from "react";

import ExerciseTable from "./ExerciseTable";

import routes from "utilities/routes";
import { UserContext } from "components/App";
import { fetchExercises, deleteExercise } from "services/Exercises";
import LinkButton from "components/reusable/LinkButton";
import Button from "components/reusable/Button";
import { useNotification } from "components/context/NotificationProvider";

function ExerciseTableMyExercises({ exercisesFilterString }) {
  const [exercises, setExercises] = useState(null);
  const { userId } = useContext(UserContext);
  const notify = useNotification();

  const fetchData = () => {
    if (userId) {
      fetchExercises(userId).then((exercises) => {
        if (exercises.length) {
          setExercises(exercises);
        } else {
          setExercises([]);
        }
      });
    }
  };

  // TODO: Do I need userId in every useEffect???
  useEffect(fetchData, [userId]);

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
        extraClasses="mx-1"
      ></LinkButton>,
      <Button
        key={"delete"}
        label={"Delete"}
        handleClick={() => handleDelete(exercise)}
        extraClasses="mx-1"
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
