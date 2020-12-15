import React, { useState } from "react";
import { useContext } from "react";

const FlagsContext = React.createContext();

const FlagsProvider = (props) => {
  const [flags, setFlags] = useState({ isSidebarOpen: true });

  return (
    <FlagsContext.Provider
      value={{ flags, setFlags }}
      {...props}
    ></FlagsContext.Provider>
  );
};

export const useFlags = () => useContext(FlagsContext);

export default FlagsProvider;
