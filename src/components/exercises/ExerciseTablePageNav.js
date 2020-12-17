import React from "react";
import { useLocation, Link } from "react-router-dom";
import routes from "utilities/routes";

import LinkHighlighedIfMatch from "hoc/LinkHighlighedIfMatch";
import styles from "./ExerciseTablePageNav.module.scss";

function ExerciseTablePageNav({ setExercisesFilterString }) {
  const location = useLocation();

  return (
    <div className={styles["nav"]}>
      <div className={styles["nav__links"]}>
        <LinkHighlighedIfMatch
          classNameBase={styles["nav__link"]}
          classNameActive={styles["nav__link--active"]}
          location={location}
          to={routes.app.exercises.myExercises}
        >
          My Exercises
        </LinkHighlighedIfMatch>
        <LinkHighlighedIfMatch
          classNameBase={styles["nav__link"]}
          classNameActive={styles["nav__link--active"]}
          location={location}
          to={routes.app.exercises.discover}
        >
          Discover
        </LinkHighlighedIfMatch>
      </div>
      <div className={styles["nav__control"]}>
        <input
          className={styles["nav__search"]}
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setExercisesFilterString(e.target.value);
          }}
        ></input>
        <Link
          to={routes.app.exercises.new}
          className={styles["nav__btn-add"]}
        ></Link>
      </div>
    </div>
  );
}

export default ExerciseTablePageNav;
