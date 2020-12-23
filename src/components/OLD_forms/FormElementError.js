import React from "react";
import PropTypes from "prop-types";
import styles from "./FormElementError.module.scss";

function FormElementError({ error }) {
  if (Array.isArray(error)) {
    return <div className={styles.error}>{error.join(" ")}</div>;
  } else {
    return <div className={styles.error}>{error}</div>;
  }
}

FormElementError.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
};

export default FormElementError;
