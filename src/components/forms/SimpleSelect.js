import React from "react";
import PropTypes from "prop-types";

import FormElementLabel from "./FormElementLabel";
import FormElementError from "./FormElementError";
import Select from "./Select";

function SimpleSelect({
  className,
  title,
  name,
  options,
  optionsDisplay,
  value,
  placeholder,
  handleChange,
  error,
}) {
  return (
    <div className={className}>
      <FormElementLabel name={name} title={title}></FormElementLabel>
      <Select
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        options={options}
        optionsDisplay={optionsDisplay}
      ></Select>
      <FormElementError error={error}></FormElementError>
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

export default SimpleSelect;
