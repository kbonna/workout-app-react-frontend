import React from "react";

import { useUser } from "context/UserProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from "components/layout/Header";
import Body from "components/layout/Body";
import LoginPage from "components/common/LoginPage";
import AuthenticatedRoute from "hoc/AuthenticatedRoute";
import PublicRoute from "hoc/PublicRoute";
import LandingPage from "components/common/LandingPage";
import NotFoundPage from "components/common/NotFoundPage";
import ForbiddenPage from "./common/ForbiddenPage";
import SignupPage from "./common/SignupPage";
import Application from "components/layout/Application";

import routes from "utilities/routes";

function App() {
  const user = useUser();

  return (
    <Router>
      <Header></Header>
      <Body>
        <Switch>
          {/* Landing page */}
          <Route exact path="/">
            <LandingPage></LandingPage>
          </Route>
          {/* App */}
          <AuthenticatedRoute path={routes.app.self} loggedIn={user.loggedIn}>
            <Application></Application>
          </AuthenticatedRoute>
          {/* Login & Signup */}
          <PublicRoute path={routes.login} loggedIn={user.loggedIn}>
            <LoginPage></LoginPage>
          </PublicRoute>
          <PublicRoute path={routes.signup} loggedIn={user.loggedIn}>
            <SignupPage></SignupPage>
          </PublicRoute>
          {/* Not found (401) page */}
          <Route path={routes.notFound}>
            <NotFoundPage></NotFoundPage>
          </Route>
          {/* Forbidden (403) page */}
          <Route path={routes.forbidden}>
            <ForbiddenPage></ForbiddenPage>
          </Route>
          {/* Fallback */}
          <Redirect to={routes.notFound} />
        </Switch>
      </Body>
    </Router>
  );
}

export default App;
