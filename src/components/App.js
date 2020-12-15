import React, { useState, useEffect, useContext } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from "./layout/Header";
import Body from "./layout/Body";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import ProtectedRoute from "./hoc/ProtectedRoute";
import PublicRoute from "./hoc/PublicRoute";
import LandingPage from "./layout/LandingPage";
import NotFoundPage from "./layout/NotFoundPage";

import { useAuth } from "./context/AuthProvider";
import { useUser } from "./context/UserProvider";

import NotificationProvider from "./context/NotificationProvider";
import routes from "utilities/routes";
import AppProviders from "./context/AppProviders";
import { useFlags } from "./context/FlagsProvider";

export const BASE_URL = "http://localhost:8000";
export const API_URL = BASE_URL + "/api";

function App() {
  const user = useUser();

  return (
    <Router>
      <Header />
      <Switch>
        {/* Landing page */}
        <Route exact path="/">
          <LandingPage></LandingPage>
        </Route>
        {/* App */}
        <ProtectedRoute path={routes.app.self} loggedIn={user.loggedIn}>
          <Body></Body>
        </ProtectedRoute>
        {/* Login & Signup */}
        <PublicRoute path={routes.login} loggedIn={user.loggedIn}>
          <LoginForm />
        </PublicRoute>
        <PublicRoute path={routes.signup} loggedIn={user.loggedIn}>
          <SignupForm />
        </PublicRoute>
        {/* Not found page */}
        <PublicRoute path={routes.notFound} loggedIn={user.loggedIn}>
          <NotFoundPage></NotFoundPage>
        </PublicRoute>
        {/* Fallback */}
        <Redirect to={routes.notFound} />
      </Switch>
    </Router>
  );
}

export default App;
