import React from "react";
import { Route, Switch } from "react-router-dom";

import ExerciseTablePage from "./ExerciseTablePage";
import ExerciseDetailPage from "./ExerciseDetailPage";
import ExerciseNewPage from "./ExerciseNewPage";

import routes from "utilities/routes";

function Exercises() {
  return (
    <>
      <Switch>
        <Route
          path={[
            routes.app.exercises.myExercises,
            routes.app.exercises.discover,
          ]}
        >
          <ExerciseTablePage></ExerciseTablePage>
        </Route>
        <Route path={`${routes.app.exercises.exercise}/:id`}>
          <ExerciseDetailPage></ExerciseDetailPage>
        </Route>
        <Route path={routes.app.exercises.new}>
          <ExerciseNewPage></ExerciseNewPage>
        </Route>
      </Switch>
    </>
  );
}

export default Exercises;
