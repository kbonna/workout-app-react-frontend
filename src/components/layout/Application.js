import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Sidebar from "./Sidebar";
import Dashboard from "components/dashboard/Dashboard";
import Exercises from "components/exercises/Exercises";
import Routines from "components/routines/Routines";
import Notifications from "components/reusable/Notifications";

import { useNotification } from "context/NotificationProvider";

import styles from "./Application.module.scss";

function Application() {
  const { path } = useRouteMatch();
  const [notifications, dispatch] = useNotification();
  return (
    <>
      <div className={styles["app-content"]}>
        <Sidebar></Sidebar>
        <Notifications
          notifications={notifications}
          dispatch={dispatch}
        ></Notifications>
        <Switch>
          <Route path={`${path}dashboard`}>
            <Dashboard></Dashboard>
          </Route>
          <Route path={`${path}inbox`}>
            <Dashboard></Dashboard>
          </Route>
          <Route path={`${path}exercises`}>
            <Exercises></Exercises>
          </Route>
          <Route path={`${path}routines`}>
            <Routines></Routines>
          </Route>
          <Route path={`${path}workouts`}>
            <Dashboard></Dashboard>
          </Route>
          <Route path={`${path}samples`}>
            <Dashboard></Dashboard>
          </Route>
          <Route path={`${path}statistics`}>
            <Dashboard></Dashboard>
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Application;
