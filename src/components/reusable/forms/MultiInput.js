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
  handleAddToField,
  handleRemoveFromField,
  placeholder,
  error,
}) {
  const [currentValue, setCurrentValue] = useState("");

  const handleChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const handleAdd = () => {
    handleAddToField(name, currentValue);
    setCurrentValue("");
  };

  const handleRemove = (index) => {
    handleRemoveFromField(name, index);
  };

  return (
    <div className={className}>
      <FormElementLabelWithBtn
        name={name}
        title={title}
        shouldRenderAddBtn={Boolean(
          currentValue && !value.includes(currentValue)
        )}
        onClick={handleAdd}
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
        handleRemove={handleRemove}
        error={error}
      ></FormElementList>
    </div>
  );
}

MultiInput.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
};

export default MultiInput;
