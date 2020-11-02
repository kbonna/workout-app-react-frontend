import React from "react";
import { useLocation } from "react-router-dom";
import { stripParentPath } from "utilities/misc";

import LinkHighlighedIfMatch from "components/hoc/LinkHighlighedIfMatch";
import "./ExerciseTablePageNav.scss";

function ExerciseTablePageNav({ setExercisesFilterString }) {
  let location = useLocation();
  const parentUrl = stripParentPath(location.pathname);

  return (
    <div className="exercise-table-page-nav">
      <div className="exercise-table-page-nav__links">
        <LinkHighlighedIfMatch
          classNameBase="exercise-table-page-nav__link"
          classNameActive="exercise-table-page-nav__link--active"
          location={location}
          to={`${parentUrl}/my-exercises`}
        >
          My Exercises
        </LinkHighlighedIfMatch>
        <LinkHighlighedIfMatch
          classNameBase="exercise-table-page-nav__link"
          classNameActive="exercise-table-page-nav__link--active"
          location={location}
          to={`${parentUrl}/discover`}
        >
          Discover
        </LinkHighlighedIfMatch>
      </div>
      <div className="exercise-table-page-nav__control">
        <input
          className="exercise-table-page-nav__search"
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setExercisesFilterString(e.target.value);
          }}
        ></input>
        <button className="exercise-table-page-nav__btn-add">+</button>
      </div>
    </div>
  );
}

export default ExerciseTablePageNav;
