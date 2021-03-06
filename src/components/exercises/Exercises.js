import React from "react";
import { Route, Switch } from "react-router-dom";

import ExerciseTablePage from "./ExerciseTablePage";
import ExerciseDetailPage from "./ExerciseDetailPage";
import ExerciseCreateUpdate from "./ExerciseCreateUpdate";

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
          <ExerciseCreateUpdate operation={"edit"}></ExerciseCreateUpdate>
        </Route>
        <Route path={routes.app.exercises.new}>
          <ExerciseCreateUpdate operation={"create"}></ExerciseCreateUpdate>
        </Route>
      </Switch>
    </>
  );
}

export default Exercises;
