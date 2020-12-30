import React from "react";
import PropTypes from "prop-types";
import styles from "./Textarea.module.scss";
import { classNames } from "utilities/misc";

function Textarea({
  className,
  label,
  name,
  placeholder,
  onChange,
  value,
  error,
}) {
  const textareaClassName = classNames({
    [styles["textarea"]]: true,
    [styles["textarea--error"]]: error.length,
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
      <textarea
        className={textareaClassName}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></textarea>
      {error.length ? (
        <div className={styles.error}>{error.join(" ")}</div>
      ) : null}
    </div>
  );
}

Textarea.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.node,
  error: PropTypes.arrayOf(PropTypes.string),
};

Textarea.defaultProps = {
  label: null,
  error: [],
};

export default Textarea;
