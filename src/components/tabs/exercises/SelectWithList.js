import React, { useState } from "react";
import PropTypes from "prop-types";

function SelectWithList({
  title,
  name,
  values,
  setValues,
  placeholder,
  options,
  optionsDisplay,
}) {
  const [currentValue, setCurrentValue] = useState("");

  const handleChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const handleAddToList = (currentValue) => {
    setValues((prevValues) => [currentValue, ...prevValues]);
    setCurrentValue("");
  };

  const handleRemoveFromList = (value) => {
    setValues((prevValues) => prevValues.filter((v) => v !== value));
  };

  // Remove options that are already part of the form state
  const optionsFiltered = options.filter((option) => !values.includes(option));
  const optionsDisplayFiltered = optionsDisplay.filter(
    (_, i) => !values.includes(options[i])
  );

  return (
    <>
      <div>
        <label htmlFor={name}>{title}</label>
        <select value={currentValue} name={name} onChange={handleChange}>
          <option disabled value="">
            {placeholder}
          </option>
          {optionsFiltered.map((option, i) => (
            <option
              value={option}
              key={option}
              label={optionsDisplayFiltered[i]}
            ></option>
          ))}
        </select>
        {currentValue && (
          <button onClick={() => handleAddToList(currentValue)}>+</button>
        )}
        <ul>
          {values
            .slice(0)
            .reverse()
            .map((value) => (
              <li key={value}>
                <span>{optionsDisplay[options.indexOf(value)]}</span>
                <button onClick={() => handleRemoveFromList(value)}>x</button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

SelectWithList.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string),
  setValues: PropTypes.func,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  optionsDisplay: PropTypes.arrayOf(PropTypes.string),
};

export default SelectWithList;
