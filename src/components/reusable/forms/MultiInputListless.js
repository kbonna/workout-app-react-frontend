import React, { useState } from "react";
import PropTypes from "prop-types";

import FormElementLabel from "./FormElementLabel";
import FormElementError from "./FormElementError";
import Input from "./Input";

function MultiInputListless({
  className,
  title,
  name,
  placeholder,
  value,
  setValue,
  error,
  allowedChars,
}) {
  const [isNextValue, setIsNextValue] = useState(false);

  const handleChange = (e) => {
    setIsNextValue(e.target.value.slice(-1) === " ");
    setValue(
      e.target.value
        .trim()
        .replace(/\s+/g, " ")
        .split("")
        .filter((ch) => allowedChars.includes(ch.toLowerCase()) || ch === " ")
        .join("")
        .split(" ")
    );
  };

  return (
    <div className={className}>
      <FormElementLabel name={name} title={title}></FormElementLabel>
      <Input
        name={name}
        type={"text"}
        value={value.join(" ") + (isNextValue ? " " : "")}
        onChange={handleChange}
        placeholder={placeholder}
      ></Input>
      <FormElementError error={error.join(" ")}></FormElementError>
    </div>
  );
}

MultiInputListless.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  setValue: PropTypes.func,
  error: PropTypes.arrayOf(PropTypes.string),
  allowedChars: PropTypes.string,
};

export default MultiInputListless;
