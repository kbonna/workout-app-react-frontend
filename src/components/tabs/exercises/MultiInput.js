import React, { useState } from "react";
import PropTypes from "prop-types";

function MultiInput({ title, name, values, setValues, placeholder }) {
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

  return (
    <>
      <div>
        <label htmlFor={name}>{title}</label>
        <input
          name={name}
          id={name}
          type={"text"}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
        ></input>
        {currentValue && !values.includes(currentValue) && (
          <button onClick={() => handleAddToList(currentValue)}>+</button>
        )}
        <ul>
          {values
            .slice(0)
            .reverse()
            .map((value) => (
              <li key={value}>
                <span>{value}</span>
                <button onClick={() => handleRemoveFromList(value)}>x</button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

MultiInput.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string),
  setValues: PropTypes.func,
  placeholder: PropTypes.string,
};

export default MultiInput;
