import React from "react";
import PropTypes from "prop-types";

import FormElementLabel from "./FormElementLabel";
import FormElementError from "./FormElementError";
import Input from "./Input";

function SimpleInput({
  className,
  title,
  name,
  type,
  placeholder,
  value,
  handleChange,
  error,
}) {
  return (
    <div className={className}>
      <FormElementLabel name={name} title={title}></FormElementLabel>
      <Input
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      ></Input>
      <FormElementError error={error}></FormElementError>
    </div>
  );
}

SimpleInput.propTypes = {
  title: PropTypes.string,
};

export default SimpleInput;
