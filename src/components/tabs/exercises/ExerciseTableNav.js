import React from "react";
import { useLocation } from "react-router-dom";
import { stripParentPath } from "utilities/misc";

import LinkHighlighedIfMatch from "components/hoc/LinkHighlighedIfMatch";
import "./ExerciseTableNav.scss";

function ExerciseTableNav({ setExercisesFilterString }) {
  let location = useLocation();
  const parentUrl = stripParentPath(location.pathname);

  return (
    <div className="exercise-table-nav">
      <div className="exercise-table-nav__links">
        <LinkHighlighedIfMatch
          classNameBase="exercise-table-nav__link"
          classNameActive="exercise-table-nav__link--active"
          location={location}
          to={`${parentUrl}/my-exercises`}
        >
          My Exercises
        </LinkHighlighedIfMatch>
        <LinkHighlighedIfMatch
          classNameBase="exercise-table-nav__link"
          classNameActive="exercise-table-nav__link--active"
          location={location}
          to={`${parentUrl}/discover`}
        >
          Discover
        </LinkHighlighedIfMatch>
      </div>
      <div className="exercise-table-nav__control">
        <input
          className="exercise-table-nav__search"
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setExercisesFilterString(e.target.value);
          }}
        ></input>
        <button className="exercise-table-nav__btn-add">+</button>
      </div>
    </div>
  );
}

export default ExerciseTableNav;
