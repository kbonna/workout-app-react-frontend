import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import ExerciseTablePage from "./ExerciseTablePage";
import ExerciseDetailPage from "./ExerciseDetailPage";

function Exercises() {
  const { url } = useRouteMatch();
  const urlMyExercises = `${url}/my-exercises`;
  const urlDiscover = `${url}/discover`;
  const urlExercise = `${url}/exercise`;

  return (
    <>
      <Switch>
        <Route
          path={[urlMyExercises, urlDiscover]}
          component={ExerciseTablePage}
        ></Route>
        {/* <Route path={urlDiscover} component={ExerciseTablePage}></Route> */}
        <Route path={`${urlExercise}/:id`}>
          <ExerciseDetailPage></ExerciseDetailPage>
        </Route>
      </Switch>
    </>
  );
}

export default Exercises;
