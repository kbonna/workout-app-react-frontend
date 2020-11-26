import React from "react";
import PropTypes from "prop-types";
import styles from "./FormElementLabel.module.scss";

function FormElementLabel({ name, title }) {
  return (
    <label className={styles.label} htmlFor={name}>
      {title}
    </label>
  );
}

FormElementLabel.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
};

export default FormElementLabel;
