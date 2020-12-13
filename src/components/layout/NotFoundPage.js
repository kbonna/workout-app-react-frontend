import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./NotFoundPage.module.scss";
import routes from "utilities/routes";

function NotFoundPage(props) {
  const history = useHistory();

  useEffect(() => {
    if (history.action === "POP") {
      console.log("POP detected");
      history.push(history.location.pathname, routes.app.self);
    }
  }, [history]);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1 className={styles.title}>404 Not Found</h1>
        <p className={styles.subtitle}>
          Unfortunately we could not find this resource.<br></br>Please try
          again another time.
        </p>
      </div>
    </div>
  );
}

NotFoundPage.propTypes = {};

export default NotFoundPage;
