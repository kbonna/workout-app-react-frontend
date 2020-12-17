import React from "react";
import { Route, Redirect } from "react-router-dom";

function PublicRoute({ children, loggedIn, redirectTo, ...rest }) {
  if (loggedIn) {
    return <Redirect to={redirectTo}></Redirect>;
  } else {
    return <Route children={children} {...rest}></Route>;
  }
}

export default PublicRoute;

PublicRoute.defaultProps = {
  redirectTo: "/app/dashboard",
};
