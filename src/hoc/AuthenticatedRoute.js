import React from "react";
import { Route, Redirect } from "react-router-dom";
import routes from "utilities/routes";

/*
 * Higher-order component for managing authenticated routes. It requires
 * passing additional loggedIn prop determining if user is logged in to access
 * that route. If so, all children components will be rendered.
 */
function AuthenticatedRoute({
  children,
  loggedIn,
  redirectTo = routes.login,
  ...rest
}) {
  if (loggedIn) {
    return <Route children={children} {...rest}></Route>;
  } else {
    return <Redirect to={redirectTo}></Redirect>;
  }
}

export default AuthenticatedRoute;
