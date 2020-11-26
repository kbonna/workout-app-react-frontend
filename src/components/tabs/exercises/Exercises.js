import React from "react";
import { Route, Switch } from "react-router-dom";

import ExerciseTablePage from "./ExerciseTablePage";
import ExerciseDetailPage from "./ExerciseDetailPage";
import ExerciseNewPage from "./ExerciseNewPage";
import ExerciseEditPage from "./ExerciseEditPage";

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
        <Route exact path={`${routes.app.exercises.exercise}:id`}>
          <ExerciseDetailPage></ExerciseDetailPage>
        </Route>
        <Route path={`${routes.app.exercises.exercise}:id/edit`}>
          <ExerciseEditPage></ExerciseEditPage>
        </Route>
        <Route path={routes.app.exercises.new}>
          <ExerciseNewPage></ExerciseNewPage>
        </Route>
      </Switch>
    </>
  );
}

export default Exercises;
