import React from "react";
import PropTypes from "prop-types";

import FormElementLabel from "./FormElementLabel";
import FormElementError from "./FormElementError";
import styles from "./Textarea.module.scss";

function SimpleTextarea({
  className,
  title,
  name,
  placeholder,
  value,
  handleChange,
  error,
}) {
  return (
    <div className={className}>
      <FormElementLabel name={name} title={title}></FormElementLabel>
      <textarea
        className={styles.textarea}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      ></textarea>
      <FormElementError error={error}></FormElementError>
    </div>
  );
}

SimpleTextarea.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};

export default SimpleTextarea;
