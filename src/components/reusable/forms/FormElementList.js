import React from "react";
import PropTypes from "prop-types";

import styles from "./FormElementList.module.scss";
import FormElementError from "./FormElementError";

function FormElementList({ value, displayValue, handleRemoveFromList, error }) {
  return (
    <ul className={styles.list}>
      {value.map((value, idx) => (
        <li className={styles["list-item"]} key={value}>
          <div className={styles["list-value"]}>
            <span className={styles.span}>{displayValue[idx]}</span>
            <button
              type="button"
              className={styles.btn}
              onClick={() => handleRemoveFromList(value)}
            >
              &times;
            </button>
          </div>
          <FormElementError error={error[idx]}></FormElementError>
        </li>
      ))}
    </ul>
  );
}

FormElementList.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  displayValue: PropTypes.arrayOf(PropTypes.string),
  handleRemoveFromList: PropTypes.func,
  error: PropTypes.arrayOf(PropTypes.string),
};

export default FormElementList;
