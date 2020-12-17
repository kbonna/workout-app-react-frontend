import React from "react";

const FlagsStateContext = React.createContext();
const FlagsDispatchContext = React.createContext();

const FLAGS_ACTIONS = {
  TOGGLE_SIDEBAR: "toggle_sidebar",
};

function flagsReducer(state, action) {
  switch (action.type) {
    case FLAGS_ACTIONS.TOGGLE_SIDEBAR: {
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const FlagsProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(flagsReducer, {
    isSidebarOpen: false,
  });
  return (
    <FlagsStateContext.Provider value={state}>
      <FlagsDispatchContext.Provider value={dispatch}>
        {children}
      </FlagsDispatchContext.Provider>
    </FlagsStateContext.Provider>
  );
};

const useFlagsState = () => {
  const context = React.useContext(FlagsStateContext);
  if (context === undefined) {
    throw new Error("useFlagsState must be used within a FlagsProvider");
  }
  return context;
};

const useFlagsDispatch = () => {
  const context = React.useContext(FlagsDispatchContext);
  if (context === undefined) {
    throw new Error("useFlagsDispatch must be used within a FlagsProvider");
  }
  return context;
};

const useFlags = () => [useFlagsState(), useFlagsDispatch()];

export default FlagsProvider;
export { useFlagsState, useFlagsDispatch, useFlags, FLAGS_ACTIONS };
