import React, { createContext, useReducer, useContext, useEffect } from "react";

import { v4 } from "uuid";

export const NotificationContext = createContext();

const NotificationProvider = (props) => {
  const [notifications, dispatch] = useReducer((notifications, action) => {
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return [...notifications, { ...action.payload }];
      case "REMOVE_NOTIFICATION":
        return notifications.filter((el) => el.id !== action.id);
      case "REMOVE_ALL_NOTIFICATIONS":
        return [];
      default:
        return notifications;
    }
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const { notifications, dispatch } = useContext(NotificationContext);

  const removeNotifications = () => {
    if (notifications.length) {
      dispatch({ type: "REMOVE_ALL_NOTIFICATIONS" });
    }
  };

  useEffect(removeNotifications, []);

  return (props) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        ...props,
      },
    });
  };
};

export default NotificationProvider;
