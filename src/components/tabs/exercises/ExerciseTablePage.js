import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import ExerciseTablePageNav from "./ExerciseTablePageNav";
import ExerciseTableMyExercises from "./ExerciseTableMyExercises";
import ExerciseTableDiscover from "./ExerciseTableDiscover";
import routes from "utilities/routes";

function ExerciseTablePage(props) {
  const [exercisesFilterString, setExercisesFilterString] = useState("");

  return (
    <>
      <ExerciseTablePageNav
        setExercisesFilterString={setExercisesFilterString}
      ></ExerciseTablePageNav>
      <Switch>
        <Route path={routes.app.exercises.myExercises}>
          <ExerciseTableMyExercises
            exercisesFilterString={exercisesFilterString}
          ></ExerciseTableMyExercises>
        </Route>
        <Route>
          <ExerciseTableDiscover
            exercisesFilterString={exercisesFilterString}
          ></ExerciseTableDiscover>
        </Route>
      </Switch>
    </>
  );
}

export default ExerciseTablePage;
