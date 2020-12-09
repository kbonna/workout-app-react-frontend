import React, { useContext } from "react";

import Button from "components/reusable/Button";
import LinkButton from "components/reusable/LinkButton";
import styles from "./ExerciseDetailButtons.module.scss";

import { UserContext } from "components/App";
import routes from "utilities/routes";

function ExerciseDetailButtons({ exercise, handleDelete, handleFork }) {
  const { userId } = useContext(UserContext);

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
