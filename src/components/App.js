import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./layout/Header";
import Body from "./layout/Body";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import ProtectedRoute from "./hoc/ProtectedRoute";
import PublicRoute from "./hoc/PublicRoute";
import LandingPage from "./layout/LandingPage";
import { login, signup } from "../services/Auth";

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
    if (localStorage.getItem("token")) {
      fetch(`${API_URL}/current_user`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((json) => {
            setLoggedIn(true);
            setUsername(json.username);
            setUserId(json.pk);
          });
        } else {
          setLoggedIn(false);
        }
      });
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  const handleLogin = (e, username, password, history) => {
    login(username, password)
      .then((userId) => {
        setLoggedIn(true);
        setUsername(username);
        setUserId(userId);
        history.push("/app/dashboard");
      })
      .catch((error) => {
        setLoginErrorMsg(error);
      });
  };

  const handleSignup = (e, username, password, history) => {
    signup(username, password)
      .then((userId) => {
        setUsername(username);
        setUserId(userId);
        setLoggedIn(true);
        history.push("app/dashboard");
      })
      .catch((error) => {
        setSignupErrorMsg(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUsername("");
  };

  if (loggedIn === null) {
    return <h1>Loading</h1>;
  } else {
    return (
      <>
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
      </>
    );
  }
}

export default App;
