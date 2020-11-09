import React from "react";
import { Link } from "react-router-dom";

import Button from "components/reusable/Button";
import routes from "utilities/routes";
import styles from "./ExerciseTableRow.module.scss";

/**
 * Actions property can be either:
 *  - handleFork
 *  - handleEdit
 *  - handleDelete
 */
function ExerciseTableRow({ exercise, ...actions }) {
  const buttons = Object.keys(actions).map((actionName) => {
    if (actionName === "handleFork" && !exercise.can_be_forked) {
      return (
        <span
          className={styles["row__span--error"]}
          key={`span-${exercise.pk}`}
        >
          You already own this
        </span>
      );
    }
    return (
      <Button
        key={actionName}
        label={actionName.replace("handle", "")}
        handleClick={() => actions[actionName](exercise.pk)}
        extraClasses="mx-1"
      ></Button>
    );
  });

  return (
    <tr className={styles["row"]}>
      <td className={styles["row__cell"]}>
        <Link
          className={styles["row__link"]}
          to={`${routes.app.exercises.exercise}/${exercise.pk}`}
        >
          {exercise.name}
        </Link>
      </td>
      <td className={styles["row__cell"]}>{exercise.kind_display}</td>
      {actions.hasOwnProperty("handleFork") ? (
        <td className={styles["row__cell"]}>
          {exercise.forks_count ? `${exercise.forks_count} ★` : "-"}
        </td>
      ) : null}
      <td className={styles["row__cell"]}>{buttons}</td>
    </tr>
  );
}

export default ExerciseTableRow;
