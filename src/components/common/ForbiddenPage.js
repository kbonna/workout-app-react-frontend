import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

function ForbiddenPage(props) {
  const history = useHistory();

  useEffect(() => {
    history.listen((location) => {
      if (history.action === "POP") {
        history.go(-2);
      }
    });
  }, [history]);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1 className={styles.title}>403 Forbidden</h1>
        <p className={styles.subtitle}>
          Unfortunately this action is forbidden.<br></br>Please check your
          permissions.
        </p>
      </div>
    </div>
  );
}

export default ForbiddenPage;
