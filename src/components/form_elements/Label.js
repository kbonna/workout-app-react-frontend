import React from "react";
import PropTypes from "prop-types";
import styles from "./Label.module.scss";

function Label({ label }) {
  return <span className={styles.label}>{label}</span>;
}

Label.propTypes = {
  label: PropTypes.string,
};

export default Label;
