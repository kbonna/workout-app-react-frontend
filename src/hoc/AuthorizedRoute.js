import React from "react";
import { Route, Redirect } from "react-router-dom";
import routes from "utilities/routes";

/*
 * Higher-order component for managing authorized (private routes). It requires
 * passing additional authorized prop determining if user is authorized to access
 * that route. If so, all children components will be rendered.
 */
function AuthorizedRoute({
  children,
  authorized,
  redirectTo = routes.forbidden,
  ...rest
}) {
  if (authorized) {
    return <Route children={children} {...rest}></Route>;
  } else {
    return <Redirect to={redirectTo}></Redirect>;
  }
}

export default AuthorizedRoute;
