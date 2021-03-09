import React from "react";
import { Route, Switch } from "react-router-dom";

import RoutineTablePage from "./RoutineTablePage";
import RoutineDetailPage from "./RoutineDetailPage";
import routes from "utilities/routes";
import RoutineCreateUpdate from "./RoutineCreateUpdate";

export const TABLE_TYPES = {
  MY: "my",
  DISCOVER: "discover",
};

export const ROUTINE_ACTIONS = {
  CREATE: "create",
  UPDATE: "update",
};

function Routines() {
  return (
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
        <RoutineCreateUpdate action={ROUTINE_ACTIONS.UPDATE}></RoutineCreateUpdate>
      </Route>
      <Route path={routes.app.routines.new}>
        <RoutineCreateUpdate action={ROUTINE_ACTIONS.CREATE}></RoutineCreateUpdate>
      </Route>
    </Switch>
  );
}

export default Routines;
