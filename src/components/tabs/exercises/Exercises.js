import React, { useContext } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { UserContext, API_URL } from "components/App";
import { fetchExercises } from "services/Exercises";
import ExerciseTablePage from "./ExerciseTablePage";
import ExerciseDetailPage from "./ExerciseDetailPage";

function Exercises() {
  const { userId } = useContext(UserContext);

  const { url } = useRouteMatch();
  const urlMyExercises = `${url}/my-exercises`;
  const urlDiscover = `${url}/discover`;
  const urlExercise = `${url}/exercise`;

  return (
    <>
      <Switch>
        <Route path={urlMyExercises}>
          <ExerciseTablePage
            url={() => fetchExercises(API_URL, userId)}
          ></ExerciseTablePage>
        </Route>
        <Route path={urlDiscover}>
          <ExerciseTablePage
            url={() => fetchExercises(API_URL, userId, true)}
          ></ExerciseTablePage>
        </Route>
        <Route path={`${urlExercise}/:id`}>
          <ExerciseDetailPage></ExerciseDetailPage>
        </Route>
      </Switch>
    </>
  );
}

export default Exercises;
