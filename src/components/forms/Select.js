import React from "react";
import PropTypes from "prop-types";
import styles from "./Select.module.scss";

function Select({
  name,
  value,
  placeholder,
  onChange,
  options,
  optionsDisplay,
}) {
  return (
    <div className={styles.wrapper}>
      <select
        className={styles.select}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option className={styles.option} value="" disabled>
          {placeholder}
        </option>
        {options.map((option, i) => (
          <option
            className={styles.option}
            value={option}
            key={option}
            label={optionsDisplay[i]}
          ></option>
        ))}
      </select>
    </div>
  );
}

Select.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  optionsDisplay: PropTypes.arrayOf(PropTypes.string),
};

export default Select;
