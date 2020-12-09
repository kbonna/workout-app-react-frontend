import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./layout/Header";
import Body from "./layout/Body";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import ProtectedRoute from "./hoc/ProtectedRoute";
import PublicRoute from "./hoc/PublicRoute";
import LandingPage from "./layout/LandingPage";
import { login, signup, current_user } from "services/Auth";
import NotificationProvider from "./context/NotificationProvider";

export const BASE_URL = "http://localhost:8000";
export const API_URL = BASE_URL + "/api";

export const UserContext = React.createContext();

function App() {
  // User context
  const [loggedIn, setLoggedIn] = useState(null);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const user = {
    username: username,
    userId: userId,
    loggedIn: loggedIn,
  };

  const [loginErrorMsg, setLoginErrorMsg] = useState();
  const [signupErrorMsg, setSignupErrorMsg] = useState();
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  useEffect(() => {
    current_user()
      .then((user) => {
        setLoggedIn(true);
        setUsername(user.username);
        setUserId(user.pk);
      })
      .catch((error) => {
        setLoggedIn(false);
        setUsername("");
        setUserId("");
      });
  }, [loggedIn]);

  const handleLogin = (e, username, password, history) => {
    login(username, password)
      .then(() => {
        setLoggedIn(true);
        history.push("/app/dashboard");
      })
      .catch((error) => {
        setLoginErrorMsg(error.message);
      });
  };

  const handleSignup = (e, username, password, history) => {
    signup(username, password)
      .then(() => {
        handleLogin(e, username, password, history);
      })
      .catch((error) => {
        setSignupErrorMsg(error.message);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token-access");
    localStorage.removeItem("token-refresh");
    setLoggedIn(false);
  };

  if (loggedIn === null) {
    return <h1>Loading</h1>;
  } else {
    return (
      <>
        <NotificationProvider>
          <UserContext.Provider value={user}>
            <Router>
              <Header
                handleLogout={handleLogout}
                setIsSidebarOpened={setIsSidebarOpened}
              />
              <Switch>
                {/* Landing page */}
                <Route exact path="/">
                  <LandingPage></LandingPage>
                </Route>
                {/* App */}
                <ProtectedRoute path="/app" loggedIn={loggedIn}>
                  <Body isSidebarOpened={isSidebarOpened}></Body>
                </ProtectedRoute>
                {/* Login & Signup */}
                <PublicRoute path="/login" loggedIn={loggedIn}>
                  <LoginForm
                    handleLogin={handleLogin}
                    loginErrorMsg={loginErrorMsg}
                    setLoginErrorMsg={setLoginErrorMsg}
                  ></LoginForm>
                </PublicRoute>
                <PublicRoute path="/signup" loggedIn={loggedIn}>
                  <SignupForm
                    handleSignup={handleSignup}
                    signupErrorMsg={signupErrorMsg}
                    setSignupErrorMsg={setSignupErrorMsg}
                  ></SignupForm>
                </PublicRoute>
              </Switch>
            </Router>
          </UserContext.Provider>
        </NotificationProvider>
      </>
    );
  }
}

export default App;
