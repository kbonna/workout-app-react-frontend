import React, { useState } from "react";
import PropTypes from "prop-types";

import FormElementLabelWithBtn from "./FormElementLabelWithBtn";
import FormElementList from "./FormElementList";
import Input from "./Input";

function MultiInput({
  className,
  title,
  name,
  value,
  setValue,
  placeholder,
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

  return (
    <div className={className}>
      <FormElementLabelWithBtn
        name={name}
        title={title}
        shouldRenderAddBtn={Boolean(
          currentValue && !value.includes(currentValue)
        )}
        onClick={() => handleAddToList(currentValue)}
      ></FormElementLabelWithBtn>
      <Input
        name={name}
        type={"text"}
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
      ></Input>
      <FormElementList
        value={value}
        displayValue={value}
        handleRemoveFromList={handleRemoveFromList}
        error={error}
      ></FormElementList>
    </div>
  );
}

MultiInput.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  setValue: PropTypes.func,
  placeholder: PropTypes.string,
};

export default MultiInput;
