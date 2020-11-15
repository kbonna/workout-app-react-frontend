import React from "react";
import PropTypes from "prop-types";

function Textarea({ title, name, placeholder, value, handleChange }) {
  return (
    <div>
      <label htmlFor={name}>{title}</label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}

Textarea.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};

export default Textarea;
