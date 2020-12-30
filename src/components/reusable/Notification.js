import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Notification.module.scss";
import { classNames } from "utilities/misc";
import { NOTIFICATION_ACTIONS } from "context/NotificationProvider";

function Notification(props) {
  const className = classNames({
    [styles["notification"]]: true,
    [styles[`notification--${props.type}`]]: Boolean(props.type),
  });

  const handleCloseNotification = () => {
    setTimeout(() => {
      props.dispatch({
        type: NOTIFICATION_ACTIONS.REMOVE_NOTIFICATION,
        id: props.id,
      });
    }, props.duration);
  };

  useEffect(handleCloseNotification, []);

  return <div className={className}>{props.message}</div>;
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

Notification.defaultProps = {
  duration: 5000,
  type: false,
};

export default Notification;
