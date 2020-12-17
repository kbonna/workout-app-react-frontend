import React from "react";
import PropTypes from "prop-types";

import styles from "./FormElementList.module.scss";
import FormElementError from "./FormElementError";

import { ACTIONS } from "components/exercises/ExerciseCreateUpdate";

function FormElementList({ name, value, displayValue, dispatch, error }) {
  return (
    <ul className={styles.list}>
      {value.map((value, idx) => (
        <li className={styles["list-item"]} key={value}>
          <div className={styles["list-value"]}>
            <span className={styles.span}>{displayValue[idx]}</span>
            <button
              id={idx}
              type="button"
              className={styles.btn}
              onClick={() => {
                dispatch({
                  type: ACTIONS.REMOVE_FROM_FIELD,
                  field: name,
                  index: idx,
                });
              }}
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
  name: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  displayValue: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func,
  error: PropTypes.array,
};

export default FormElementList;
