import React, { useContext } from "react";
import { UserContext } from "components/App";
import { useHistory } from "react-router-dom";
import Button from "components/reusable/Button";
import { deleteExercise } from "services/Exercises";
import styles from "./ExerciseDetailButtons.module.scss";

function ExerciseDetailButtons({ exercise }) {
  const { userId } = useContext(UserContext);
  const history = useHistory();

  function handleEdit(e) {
    console.log(`editing exercise ${exercise.pk}`);
  }

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
        <Button
          label="Edit"
          handleClick={handleEdit}
          extraClasses={styles["buttons__btn"]}
        ></Button>
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
