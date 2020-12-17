import React, { useState } from "react";
import PropTypes from "prop-types";

import FormElementLabelWithBtn from "./FormElementLabelWithBtn";
import FormElementList from "./FormElementList";
import Input from "./Input";

import { ACTIONS } from "components/exercises/ExerciseCreateUpdate";

function MultiInput({
  className,
  title,
  name,
  value,
  placeholder,
  error,
  dispatch,
  jsonKey,
}) {
  const [currentValue, setCurrentValue] = useState("");

  const handleChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const handleAdd = () => {
    dispatch({
      type: ACTIONS.ADD_TO_FIELD,
      field: name,
      value: currentValue,
      jsonKey: jsonKey,
    });
    setCurrentValue("");
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
        name={name}
        value={value}
        displayValue={value}
        dispatch={dispatch}
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
