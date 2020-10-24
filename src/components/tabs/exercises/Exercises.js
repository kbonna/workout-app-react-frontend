import React, { useState, useEffect, useContext } from "react";
import { UserContext, API_URL } from "components/App";
import { header_with_token } from "services/Auth";
import { useLocation, Route, Switch, useRouteMatch } from "react-router-dom";

import ExerciseTablePage from "./ExerciseTablePage";
import ExerciseDetailPage from "./ExerciseDetailPage";

function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [exercisesFilterString, setExercisesFilterString] = useState("");
  const { userId } = useContext(UserContext);

  const location = useLocation();
  const { url } = useRouteMatch();
  const urlMyExercises = `${url}/my-exercises`;
  const urlDiscover = `${url}/discover`;
  const urlExercise = `${url}/exercise`;

  console.log(exercises);

  useEffect(() => {
    if (userId) {
      if (location.pathname === urlMyExercises) {
        //TODO: some loading spinner
        fetchExercises(API_URL, userId).then((exercises) => {
          if (exercises.length) {
            setExercises(exercises);
          }
        });
      } else if (location.pathname === urlDiscover) {
        fetchExercises(API_URL, userId, true).then((exercises) => {
          if (exercises.length) {
            setExercises(exercises);
          }
        });
      } else if (location.pathname.includes(urlExercise)) {
        const exerciseId = location.pathname.split("/").slice(-1)[0];
        fetchExercise(API_URL, exerciseId).then((exercise) => {
          setExercises([exercise]);
        });
      }
    }
  }, [userId, location.pathname, urlDiscover, urlExercise, urlMyExercises]);

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
      <Switch>
        <Route path={`${url}/my-exercises`}>
          <ExerciseTablePage
            exercises={filterExercises(exercises, exercisesFilterString)}
            setExercisesFilterString={setExercisesFilterString}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          ></ExerciseTablePage>
        </Route>
        <Route path={`${url}/discover`}>
          <ExerciseTablePage
            exercises={filterExercises(exercises, exercisesFilterString)}
            setExercisesFilterString={setExercisesFilterString}
            handleFork={handleFork}
          ></ExerciseTablePage>
        </Route>
        <Route path={`${url}/exercise/:id`}>
          <ExerciseDetailPage></ExerciseDetailPage>
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

const fetchExercise = async function (api_url, exerciseId) {
  const response = await fetch(`${api_url}/exercises/${exerciseId}`, {
    headers: header_with_token(),
  });
  if (response.status !== 200) {
    return [];
  }
  const exercises = await response.json();
  return exercises;
};

export default Exercises;
