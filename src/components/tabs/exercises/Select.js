import React from "react";
import PropTypes from "prop-types";

function Select({
  title,
  name,
  options,
  optionsDisplay,
  value,
  placeholder,
  handleChange,
}) {
  return (
    <div>
      <label htmlFor={name}>{title}</label>
      <select name={name} value={value} onChange={handleChange}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, i) => (
          <option
            value={option}
            key={option}
            label={optionsDisplay[i]}
          ></option>
        ))}
      </select>
    </div>
  );
}

Select.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  optionsDisplay: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
};

export default Select;
