import React, { useState } from "react";
import PropTypes from "prop-types";

import Select from "./Select";
import FormElementLabelWithBtn from "./FormElementLabelWithBtn";
import FormElementList from "./FormElementList";

import { FORM_ACTIONS } from "reducers/form";

function MultiSelect({
  className,
  title,
  name,
  placeholder,
  value,
  error,
  options,
  optionsDisplay,
  dispatch,
  jsonKey,
}) {
  const [currentValue, setCurrentValue] = useState("");

  const handleChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const handleAdd = () => {
    dispatch({
      type: FORM_ACTIONS.ADD_TO_FIELD,
      field: name,
      value: currentValue,
      jsonKey: jsonKey,
    });
    setCurrentValue("");
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
        onClick={handleAdd}
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
        name={name}
        value={value}
        displayValue={value.map((v) => optionsDisplay[options.indexOf(v)])}
        dispatch={dispatch}
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
