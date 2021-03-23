import React from "react";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";
import { classNames } from "utilities/misc";
import { Link } from "react-router-dom";

function LinkButton({ to, label, buttonType, buttonSize, disabled, className, ...rest }) {
  const classList = classNames({
    [styles.Button]: true,
    [styles.Button__disabled]: disabled,
    [styles[`Button__${buttonType}`]]: Boolean(buttonType),
    [styles[`Button__${buttonSize}`]]: Boolean(buttonSize),
    [className]: Boolean(className),
  });

  return (
    <Link to={to} className={classList} {...rest}>
      {label}
    </Link>
  );
}

LinkButton.defaultProps = {
  className: "",
  buttonType: "light",
  buttonSize: "normal",
  disabled: false,
};

LinkButton.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
  label: PropTypes.string,
  buttonType: PropTypes.string,
  buttonSize: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default LinkButton;
