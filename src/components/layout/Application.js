import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Sidebar from "./Sidebar";
import Dashboard from "components/dashboard/Dashboard";
import Exercises from "components/exercises/Exercises";
import Routines from "components/routines/Routines";
import Notifications from "components/reusable/Notifications";
import Settings from "components/users/Settings";
import UserProfilePage from "components/users/UserProfilePage";
import { useNotification } from "context/NotificationProvider";

import styles from "./Application.module.scss";
import routes from "utilities/routes";

function Application() {
  const [notifications, dispatch] = useNotification();
  return (
    <>
      <div className={styles.appContent}>
        <Sidebar></Sidebar>
        <Notifications notifications={notifications} dispatch={dispatch}></Notifications>
        <Switch>
          <Route path={routes.app.dashboard.self}>
            <Dashboard></Dashboard>
          </Route>
          <Route path={routes.app.inbox.self}>
            <Dashboard></Dashboard>
          </Route>
          <Route path={routes.app.exercises.self}>
            <Exercises></Exercises>
          </Route>
          <Route path={routes.app.routines.self}>
            <Routines></Routines>
          </Route>
          <Route path={routes.app.workouts.self}>
            <Dashboard></Dashboard>
          </Route>
          <Route path={routes.app.samples.self}>
            <Dashboard></Dashboard>
          </Route>
          <Route path={routes.app.statistics.self}>
            <Dashboard></Dashboard>
          </Route>
          <Route exact path={`${routes.app.users.user}:pk`}>
            <UserProfilePage></UserProfilePage>
          </Route>
          <Route path={routes.app.settings.self}>
            <Settings></Settings>
          </Route>
          <Redirect to={routes.notFound}></Redirect>
        </Switch>
      </div>
    </>
  );
}

export default Application;
