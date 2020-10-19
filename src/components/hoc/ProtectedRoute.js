import React from "react";
import { Route, Redirect } from "react-router-dom";

/*
 * Higher-order component for managing protected (private routes). It requires
 * passing additional loggedIn prop determining if user is logged in to access
 * that route. If so, all children components will be rendered.
 */
function ProtectedRoute({ children, loggedIn, redirectTo, ...rest }) {
  if (loggedIn) {
    return <Route children={children} {...rest}></Route>;
  } else {
    return <Redirect to={redirectTo}></Redirect>;
  }
}

export default ProtectedRoute;

ProtectedRoute.defaultProps = {
  redirectTo: "/login",
};
