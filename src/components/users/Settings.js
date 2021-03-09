import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "utilities/routes";
import UserProfileSettings from "./UserProfileSettings";
import UserProfileUpdate from "./UserProfileUpdate";

const Settings = () => {
  return (
    <Switch>
      <Route exact path={routes.app.settings.profile.self}>
        <UserProfileSettings></UserProfileSettings>
      </Route>
      <Route exact path={routes.app.settings.profile.edit}>
        <UserProfileUpdate></UserProfileUpdate>
      </Route>
    </Switch>
  );
};

export default Settings;
