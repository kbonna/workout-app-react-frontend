import React from "react";
import PropTypes from "prop-types";
import Notification from "./Notification";
import styles from "./Notifications.module.scss";

function Notifications({ notifications, dispatch }) {
  return (
    <div className={styles.notifications}>
      {notifications.map((notification) => {
        return (
          <Notification
            dispatch={dispatch}
            key={notification.id}
            {...notification}
          ></Notification>
        );
      })}
    </div>
  );
}

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func,
};

export default Notifications;
