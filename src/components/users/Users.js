import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "utilities/routes";
import UserAccountPage from "./UserAccountPage";
import UserProfilePage from "./UserProfilePage";
import UserProfileUpdate from "./UserProfileUpdate";

const Users = () => {
  return (
    <>
      <Switch>
        <Route exact path={`${routes.app.users.user}:pk`}>
          <UserProfilePage></UserProfilePage>
        </Route>
        {/* Accessible only for owner */}
        <Route path={`${routes.app.users.user}:pk/account`}>
          <UserAccountPage></UserAccountPage>
        </Route>
        <Route path={`${routes.app.users.user}:pk/edit`}>
          <UserProfileUpdate></UserProfileUpdate>
        </Route>
      </Switch>
    </>
  );
};

export default Users;
