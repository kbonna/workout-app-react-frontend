import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Button from "components/reusable/Button";
import LinkButton from "components/reusable/LinkButton";
import styles from "./ExerciseDetailButtons.module.scss";

import { UserContext } from "components/App";
import { deleteExercise } from "services/Exercises";
import routes from "utilities/routes";

function ExerciseDetailButtons({ exercise }) {
  const { userId } = useContext(UserContext);
  const history = useHistory();

  function handleDelete(e) {
    deleteExercise(exercise.pk).then((success) => {
      if (success) {
        history.goBack();
      }
    });
  }

  function handleFork(e) {
    console.log(`forking exercise ${exercise.pk}`);
  }

  return (
    <div className={styles["buttons"]}>
      {exercise.owner === userId && (
        <LinkButton
          to={`${routes.app.exercises.exercise}${exercise.pk}/edit`}
          label="Edit"
          extraClasses={styles["buttons__btn"]}
        ></LinkButton>
      )}
      {exercise.owner === userId && (
        <Button
          label="Delete"
          handleClick={handleDelete}
          extraClasses={styles["buttons__btn"]}
        ></Button>
      )}
      {exercise.owner !== userId && exercise.can_be_forked && (
        <Button
          label="Fork"
          handleClick={handleFork}
          extraClasses={styles["buttons__btn"]}
        ></Button>
      )}
      {exercise.owner !== userId && !exercise.can_be_forked && (
        <span className={styles["buttons__span--error"]}>
          You already own this
        </span>
      )}
    </div>
  );
}

export default ExerciseDetailButtons;
