import React from "react";
import { useAuth } from "./AuthProvider";

export const UserContext = React.createContext();

const UserProvider = (props) => {
  return (
    <UserContext.Provider
      value={useAuth().user}
      {...props}
    ></UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);

export default UserProvider;
