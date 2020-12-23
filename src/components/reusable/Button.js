import React from "react";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";
import { classNames } from "utilities/misc";

function Button({
  handleClick,
  label,
  buttonType,
  buttonSize,
  disabled,
  className,
  ...rest
}) {
  const classList = classNames({
    [styles["btn"]]: true,
    [styles["btn--disabled"]]: disabled,
    [styles[`btn--${buttonType}`]]: Boolean(buttonType),
    [styles[`btn--${buttonSize}`]]: Boolean(buttonSize),
    [className]: Boolean(className),
  });

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={classList}
      {...rest}
    >
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
