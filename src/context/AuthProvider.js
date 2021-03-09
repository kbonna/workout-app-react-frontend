import React from "react";
import { useState, useEffect } from "react";

import Spinner from "components/reusable/Spinner";
import { loginUser, signupUser, currentUser } from "services/auth";

export const AuthContext = React.createContext();

const guest = { username: "", pk: null };

function AuthProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    currentUser()
      .then((user) => {
        setUser({ ...user, loggedIn: true });
      })
      .catch(() => {
        setUser({ ...guest, loggedIn: false });
      });
  }, []);

  const login = async (username, password) => {
    await loginUser(username, password);
    const user = await currentUser();
    setUser({ ...user, loggedIn: true });
  };

  const signup = async (data) => {
    await signupUser(data);
    await login(data.username, data.password);
  };

  const logout = () => {
    localStorage.removeItem("token-access");
    localStorage.removeItem("token-refresh");
    setUser({ ...guest, loggedIn: false });
  };

  if (user === null) {
    return (
      <div className={"position-fixed-center"}>
        <Spinner></Spinner>
      </div>
    );
  } else {
    return (
      <AuthContext.Provider
        value={{ user, login, logout, signup }}
        {...props}
      ></AuthContext.Provider>
    );
  }
}

export const useAuth = () => React.useContext(AuthContext);

export default AuthProvider;
