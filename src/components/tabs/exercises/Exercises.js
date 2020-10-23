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
  const { userId } = useContext(UserContext);

  let { url } = useRouteMatch();
  let location = useLocation();

  useEffect(() => {
    if (userId) {
      if (location.pathname === `${url}/my-exercises`) {
        fetchExercises(API_URL, userId).then((exercises) => {
          if (exercises.length) {
            setExercises(exercises);
          }
        });
      } else if (location.pathname === `${url}/discover`) {
        fetchExercises(API_URL, userId, true).then((exercises) => {
          if (exercises.length) {
            setExercises(exercises);
          }
        });
      }
    }
  }, [userId, url, location.pathname]);

  function handleDelete(exerciseId) {
    fetch(`${API_URL}/exercises/${exerciseId}`, {
      method: "delete",
      headers: header_with_token(),
    }).then((res) => {
      if (res.status === 204) {
        console.log("resetting exercises");
        setExercises((prevExercises) =>
          prevExercises.filter((exercise) => exercise.pk !== exerciseId)
        );
      }
    });
  }

  function handleEdit(exerciseId) {
    console.log(`editing exercise ${exerciseId}`);
  }

  function handleFork(exerciseId) {
    console.log(`forking exercise ${exerciseId}`);
  }

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
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          ></ExerciseTable>
        </Route>
        <Route path={`${url}/discover`}>
          <ExerciseTable
            exercises={filterExercises(exercises, exercisesFilterString)}
            handleFork={handleFork}
          ></ExerciseTable>
        </Route>
      </Switch>
    </>
  );
}

/**
 * Returns all exercise owned by the user. In case of error in response, empty
 * array is returned.
 *
 * @param {string} api_url - REST API url.
 * @param {number} userId - User primary key.
 * @param {boolean} discover - Determines if querystring should include discover
 * flag.
 */
const fetchExercises = async function (api_url, userId, discover = false) {
  const response = await fetch(
    `${api_url}/exercises/?user=${userId}${discover ? "&discover=True" : ""}`,
    {
      headers: header_with_token(),
    }
  );
  if (response.status !== 200) {
    return [];
  }
  const exercises = await response.json();
  return exercises;
};

export default Exercises;
