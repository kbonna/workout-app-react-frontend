import React from "react";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";
import { classNames } from "utilities/misc";

function Button({ handleClick, label, buttonType, buttonSize, disabled, className, ...rest }) {
  const classList = classNames({
    [styles.Button]: true,
    [styles.Button__disabled]: disabled,
    [styles[`Button__${buttonType}`]]: Boolean(buttonType),
    [styles[`Button__${buttonSize}`]]: Boolean(buttonSize),
    [className]: Boolean(className),
  });

  return (
    <button onClick={handleClick} disabled={disabled} className={classList} {...rest}>
      {label}
    </button>
  );
}

Button.defaultProps = {
  className: "",
  buttonType: "light",
  buttonSize: "normal",
  disabled: false,
};

Button.propTypes = {
  handleClick: PropTypes.func,
  label: PropTypes.string,
  buttonType: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
