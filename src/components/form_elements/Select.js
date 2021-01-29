import React from "react";
import PropTypes from "prop-types";

import styles from "./Select.module.scss";
import { classNames } from "utilities/misc";

function Select({
  className,
  label,
  name,
  options,
  optionsDisplay,
  placeholder,
  onChange,
  value,
  error,
}) {
  const selectClassName = classNames({
    [styles["select"]]: true,
    [styles["select--error"]]: error.length,
  });
  return (
    <div className={className}>
      {label ? (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      ) : (
        label
      )}
      <div className={styles.wrapper}>
        <select
          className={selectClassName}
          name={name}
          value={value}
          onChange={onChange}
        >
          <option className={styles.option} value="" disabled>
            {placeholder}
          </option>
          {options.map((option, i) => (
            <option
              className={styles.option}
              value={option}
              key={option}
              label={optionsDisplay[i]}
            ></option>
          ))}
        </select>
      </div>
      {error.length ? (
        <div className={styles.error}>{error.join(" ")}</div>
      ) : null}
    </div>
  );
}

Select.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  optionsDisplay: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.node,
  error: PropTypes.arrayOf(PropTypes.string),
};

Select.defaultProps = {
  label: null,
  error: [],
};

export default Select;
