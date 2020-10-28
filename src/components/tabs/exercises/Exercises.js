import React, { useState, useEffect, useContext } from "react";
import { UserContext, API_URL } from "components/App";
import { header_with_token } from "services/Auth";
import { useLocation, Route, Switch, useRouteMatch } from "react-router-dom";

import ExerciseTablePage from "./ExerciseTablePage";
import ExerciseDetailPage from "./ExerciseDetailPage";
import { fetchExercise, fetchExercises } from "services/Exercises";

/**
 * State:
 *  exercises:
 *    Array representing fetched list of exercises. In case of fetching single
 *    exercise using detail endpoint, array will contain single element. Empty
 *    array represents cases in which exercises were not found (due to either
 *    incorrectly requesting non existing resource or in the case when user did
 *    not defined or forked any exercises yet). During fetching, exercises is
 *    null to inform child compontents that they should render loaders instead
 *    of missing resources information.
 */
function Exercises() {
  const [exercises, setExercises] = useState([]);
  const { userId } = useContext(UserContext);

  const location = useLocation();
  const { url } = useRouteMatch();
  const urlMyExercises = `${url}/my-exercises`;
  const urlDiscover = `${url}/discover`;
  const urlExercise = `${url}/exercise`;

  const fetchData = () => {
    if (userId) {
      setExercises(null);
      let fetchDataPromise;
      if (location.pathname === urlMyExercises) {
        fetchDataPromise = fetchExercises(API_URL, userId);
      } else if (location.pathname === urlDiscover) {
        fetchDataPromise = fetchExercises(API_URL, userId, true);
      } else if (location.pathname.includes(urlExercise)) {
        const exerciseId = location.pathname.split("/").slice(-1)[0];
        fetchDataPromise = fetchExercise(API_URL, exerciseId);
      }
      fetchDataPromise.then((exercises) => {
        if (exercises.length) {
          setExercises(exercises);
        } else {
          setExercises([]);
        }
      });
    }
  };

  useEffect(fetchData, [userId, location.pathname]);
  // console.log(JSON.stringify(header_with_token()));

  // TODO: move into servives
  function handleDelete(exerciseId) {
    fetch(`${API_URL}/exercises/${exerciseId}`, {
      method: "delete",
      headers: header_with_token(),
    }).then((res) => {
      if (res.status === 204) {
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
    fetch(`${API_URL}/exercises/${exerciseId}`, {
      method: "post",
      headers: header_with_token(),
    }).then((res) => {
      console.log(res);
    });
  }

  return (
    <>
      <Switch>
        <Route path={urlMyExercises}>
          <ExerciseTablePage
            exercises={exercises}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          ></ExerciseTablePage>
        </Route>
        <Route path={urlDiscover}>
          <ExerciseTablePage
            exercises={exercises}
            handleFork={handleFork}
          ></ExerciseTablePage>
        </Route>
        <Route path={`${urlExercise}/:id`}>
          <ExerciseDetailPage exercises={exercises}></ExerciseDetailPage>
        </Route>
      </Switch>
    </>
  );
}

export default Exercises;
