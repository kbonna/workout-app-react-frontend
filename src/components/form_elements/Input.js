import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";
import { classNames } from "utilities/misc";

function Input({
  className,
  label,
  name,
  type,
  placeholder,
  onChange,
  value,
  error,
}) {
  const inputClassName = classNames({
    [styles.input]: true,
    [styles["input--error"]]: error.length,
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
      <input
        className={inputClassName}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></input>
      {error.length ? (
        <div className={styles.error}>{error.join(" ")}</div>
      ) : null}
    </div>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(["text", "password"]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.node,
  error: PropTypes.arrayOf(PropTypes.string),
};

Input.defaultProps = {
  label: null,
  error: [],
};

export default Input;
