import React from "react";

import Button from "components/reusable/Button";
import LinkButton from "components/reusable/LinkButton";
import styles from "./ExerciseDetailButtons.module.scss";

import routes from "utilities/routes";
import { useUser } from "context/UserProvider";

function ExerciseDetailButtons({ exercise, handleDelete, handleFork }) {
  const user = useUser();

  return (
    <div className={styles["buttons"]}>
      {exercise.owner === user.pk && (
        <LinkButton
          to={`${routes.app.exercises.exercise}${exercise.pk}/edit`}
          label="Edit"
          className={styles["buttons__btn"]}
        ></LinkButton>
      )}
      {exercise.owner === user.pk && (
        <Button
          label="Delete"
          handleClick={handleDelete}
          className={styles["buttons__btn"]}
        ></Button>
      )}
      {exercise.owner !== user.pk && exercise.can_be_forked && (
        <Button
          label="Fork"
          handleClick={handleFork}
          className={styles["buttons__btn"]}
        ></Button>
      )}
      {exercise.owner !== user.pk && !exercise.can_be_forked && (
        <span className={styles["buttons__span--error"]}>
          You already own this
        </span>
      )}
    </div>
  );
}

export default ExerciseDetailButtons;
