import React, { useReducer, useContext, useEffect } from "react";
import { v4 } from "uuid";

const NotificationStateContext = React.createContext();
const NotificationDispatchContext = React.createContext();

const NOTIFICATION_ACTIONS = {
  ADD_NOTIFICATION: "add_notification",
  REMOVE_NOTIFICATION: "remove_notification",
  REMOVE_ALL_NOTIFICATIONS: "remove_all_notifications",
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case NOTIFICATION_ACTIONS.ADD_NOTIFICATION:
      return [...state, { ...action.payload }];
    case NOTIFICATION_ACTIONS.REMOVE_NOTIFICATION:
      return state.filter((el) => el.id !== action.id);
    case NOTIFICATION_ACTIONS.REMOVE_ALL_NOTIFICATIONS:
      return [];
    default:
      return state;
  }
};

const NotificationProvider = (props) => {
  const [state, dispatch] = useReducer(notificationReducer, []);
  return (
    <NotificationStateContext.Provider value={state}>
      <NotificationDispatchContext.Provider value={dispatch}>
        {props.children}
      </NotificationDispatchContext.Provider>
    </NotificationStateContext.Provider>
  );
};

const useNotificationState = () => {
  const context = useContext(NotificationStateContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationState must be used within a NotificationProvider"
    );
  }
  return context;
};

const useNotificationDispatch = () => {
  const context = useContext(NotificationDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationDispatch must be used within a NotificationProvider"
    );
  }
  return context;
};

const useNotify = () => {
  const notifications = useContext(NotificationStateContext);
  const dispatch = useContext(NotificationDispatchContext);

  const removeNotifications = () => {
    if (notifications.length) {
      dispatch({ type: NOTIFICATION_ACTIONS.REMOVE_ALL_NOTIFICATIONS });
    }
  };

  useEffect(removeNotifications, []);

  const notify = (props) => {
    dispatch({
      type: NOTIFICATION_ACTIONS.ADD_NOTIFICATION,
      payload: {
        id: v4(),
        ...props,
      },
    });
  };

  return notify;
};

const useNotification = () => [
  useNotificationState(),
  useNotificationDispatch(),
];

export default NotificationProvider;
export {
  useNotification,
  useNotificationState,
  useNotificationDispatch,
  useNotify,
  NOTIFICATION_ACTIONS,
};
