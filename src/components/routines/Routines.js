import React from "react";
import { Route, Switch } from "react-router-dom";

import RoutineTablePage from "./RoutineTablePage";
import RoutineDetailPage from "./RoutineDetailPage";
import routes from "utilities/routes";

export const TABLE_TYPES = {
  MY: "my",
  DISCOVER: "discover",
};

function Routines() {
  return (
    <>
      <Switch>
        <Route path={routes.app.routines.myRoutines}>
          <RoutineTablePage tableType={TABLE_TYPES.MY}></RoutineTablePage>
        </Route>
        <Route path={routes.app.routines.discover}>
          <RoutineTablePage tableType={TABLE_TYPES.DISCOVER}></RoutineTablePage>
        </Route>
        <Route exact path={`${routes.app.routines.routine}:id`}>
          <RoutineDetailPage></RoutineDetailPage>
        </Route>
        <Route path={`${routes.app.routines.routine}:id/edit`}>
          <h1>Edit routine</h1>
        </Route>
        <Route path={routes.app.routines.new}>
          <h1>Create new routine</h1>
        </Route>
      </Switch>
    </>
  );
}

export default Routines;
