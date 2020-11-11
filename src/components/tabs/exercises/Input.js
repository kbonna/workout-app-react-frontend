import React from "react";
import PropTypes from "prop-types";

function Input({ title, name, type, placeholder, value, handleChange }) {
  return (
    <div>
      <label htmlFor={name}>{title}</label>
      <input
        name={name}
        id={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      ></input>
    </div>
  );
}

Input.propTypes = {
  title: PropTypes.string,
};

export default Input;
