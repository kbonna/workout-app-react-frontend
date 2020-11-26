import React, { useState } from "react";
import PropTypes from "prop-types";

import Select from "./Select";
import FormElementLabelWithBtn from "./FormElementLabelWithBtn";
import FormElementList from "./FormElementList";

function MultiSelect({
  className,
  title,
  name,
  value,
  setValue,
  placeholder,
  options,
  optionsDisplay,
  error,
}) {
  const [currentValue, setCurrentValue] = useState("");

  const handleChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const handleAddToList = (currentValue) => {
    setValue((prevValue) => [...prevValue, currentValue]);
    setCurrentValue("");
  };

  const handleRemoveFromList = (value) => {
    setValue((prevValue) => prevValue.filter((v) => v !== value));
  };

  // Remove options that are already part of the form state
  const optionsFiltered = options.filter((option) => !value.includes(option));
  const optionsDisplayFiltered = optionsDisplay.filter(
    (_, i) => !value.includes(options[i])
  );

  return (
    <div className={className}>
      <FormElementLabelWithBtn
        name={name}
        title={title}
        shouldRenderAddBtn={Boolean(currentValue)}
        onClick={() => handleAddToList(currentValue)}
      ></FormElementLabelWithBtn>
      <Select
        name={name}
        value={currentValue}
        placeholder={placeholder}
        onChange={handleChange}
        options={optionsFiltered}
        optionsDisplay={optionsDisplayFiltered}
      ></Select>
      <FormElementList
        value={value}
        displayValue={value.map((v) => optionsDisplay[options.indexOf(v)])}
        handleRemoveFromList={handleRemoveFromList}
        error={error}
      ></FormElementList>
    </div>
  );
}

MultiSelect.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  setValue: PropTypes.func,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  optionsDisplay: PropTypes.arrayOf(PropTypes.string),
};

export default MultiSelect;
