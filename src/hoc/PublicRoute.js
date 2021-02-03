import React from "react";
import { Route, Redirect } from "react-router-dom";
import routes from "utilities/routes";

function PublicRoute({
  children,
  loggedIn,
  redirectTo = routes.app.dashboard.self,
  ...rest
}) {
  if (loggedIn) {
    return <Redirect to={redirectTo}></Redirect>;
  } else {
    return <Route children={children} {...rest}></Route>;
  }
}

export default PublicRoute;
