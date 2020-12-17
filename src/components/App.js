import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from "components/layout/Header";
import Body from "components/layout/Body";
import LoginPage from "components/common/LoginPage";
import SignupForm from "components/common/SignupForm";
import ProtectedRoute from "hoc/ProtectedRoute";
import PublicRoute from "hoc/PublicRoute";
import LandingPage from "components/common/LandingPage";
import NotFoundPage from "components/common/NotFoundPage";

import { useUser } from "context/UserProvider";
import routes from "utilities/routes";
import Application from "components/layout/Application";

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
          <ProtectedRoute path={routes.app.self} loggedIn={user.loggedIn}>
            <Application></Application>
          </ProtectedRoute>
          {/* Login & Signup */}
          <PublicRoute path={routes.login} loggedIn={user.loggedIn}>
            <LoginPage></LoginPage>
          </PublicRoute>
          <PublicRoute path={routes.signup} loggedIn={user.loggedIn}>
            <SignupForm></SignupForm>
          </PublicRoute>
          {/* Not found page */}
          <Route path={routes.notFound} loggedIn={user.loggedIn}>
            <NotFoundPage></NotFoundPage>
          </Route>
          {/* Fallback */}
          <Redirect to={routes.notFound} />
        </Switch>
      </Body>
    </Router>
  );
}

export default App;
