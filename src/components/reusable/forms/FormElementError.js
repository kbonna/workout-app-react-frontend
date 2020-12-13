import React from "react";
import PropTypes from "prop-types";
import styles from "./FormElementError.module.scss";

function FormElementError({ error }) {
  return <div className={styles.error}>{error}</div>;
}

FormElementError.propTypes = {
  error: PropTypes.arrayOf(PropTypes.string),
};

export default FormElementError;
