import React, { useContext } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "../tabs/Dashboard";
import Exercises from "../tabs/exercises/Exercises";
import Routines from "../tabs/Routines";
import Workouts from "../tabs/Workouts";
import Samples from "../tabs/Samples";
import Statistics from "../tabs/Statistics";
import { NotificationContext } from "components/context/NotificationProvider";
import Notifications from "components/context/Notifications";

import Inbox from "../tabs/Inbox";
import "./Body.scss";

function Body({ isSidebarOpened }) {
  let { path } = useRouteMatch();
  let { notifications, dispatch } = useContext(NotificationContext);
  return (
    <>
      <div className="app-content">
        <Sidebar isSidebarOpened={isSidebarOpened}></Sidebar>
        <Notifications
          notifications={notifications}
          dispatch={dispatch}
        ></Notifications>
        <Switch>
          <Route path={`${path}dashboard`}>
            <Dashboard></Dashboard>
          </Route>
          <Route path={`${path}inbox`}>
            <Inbox></Inbox>
          </Route>
          <Route path={`${path}exercises`}>
            <Exercises></Exercises>
          </Route>
          <Route path={`${path}routines`}>
            <Routines></Routines>
          </Route>
          <Route path={`${path}workouts`}>
            <Workouts></Workouts>
          </Route>
          <Route path={`${path}samples`}>
            <Samples></Samples>
          </Route>
          <Route path={`${path}statistics`}>
            <Statistics></Statistics>
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Body;
