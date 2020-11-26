import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";

function Input({ name, type, value, onChange, placeholder }) {
  return (
    <input
      name={name}
      id={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.input}
    ></input>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Input;
