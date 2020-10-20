import React, { useState, useEffect, useContext } from "react";
import ExerciseTable from "./ExerciseTable";
import { UserContext, API_URL } from "components/App";
import { header_with_token } from "services/Auth";
import { useRouteMatch, useLocation, Route, Switch } from "react-router-dom";
import LinkHighlighedIfMatch from "components/hoc/LinkHighlighedIfMatch";
import "./Exercises.scss";

function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [exercisesFilterString, setExercisesFilterString] = useState("");
  const user = useContext(UserContext);
  const { userId } = user;

  let { url } = useRouteMatch();
  let location = useLocation();

  useEffect(() => {
    if (userId) {
      fetch(`${API_URL}/exercises/?user=${userId}`, {
        headers: header_with_token(),
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((json) => {
            setExercises(json);
          });
        }
      });
    }
  }, [userId]);

  const filterExercises = (exercises, exercisesFilterString) => {
    return exercises.filter((exercise) => {
      if (!exercisesFilterString) {
        return true;
      } else if (exercise.name.includes(exercisesFilterString)) {
        return true;
      } else {
        return false;
      }
    });
  };

  return (
    <>
      <div className="exercise-table-nav">
        <div className="exercise-table-nav__links">
          <LinkHighlighedIfMatch
            classNameBase="exercise-table-nav__link"
            classNameActive="exercise-table-nav__link--active"
            location={location}
            to={`${url}/my-exercises`}
          >
            My Exercises
          </LinkHighlighedIfMatch>
          <LinkHighlighedIfMatch
            classNameBase="exercise-table-nav__link"
            classNameActive="exercise-table-nav__link--active"
            location={location}
            to={`${url}/discover`}
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
      <Switch>
        <Route path={`${url}/my-exercises`}>
          <ExerciseTable
            exercises={filterExercises(exercises, exercisesFilterString)}
          ></ExerciseTable>
        </Route>
        <Route path={`${url}/discover`}>
          <h1>Discover</h1>
        </Route>
      </Switch>
    </>
  );
}

export default Exercises;
