import React from "react";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";
import { classNames } from "utilities/misc";

function Button({ handleClick, label, buttonType, extraClasses }) {
  const className = classNames({
    [styles["btn"]]: true,
    [styles[`btn--${buttonType}`]]: Boolean(buttonType),
    [extraClasses]: Boolean(extraClasses),
  });

  return (
    <button onClick={handleClick} className={className}>
      {label}
    </button>
  );
}

Button.defaultProps = {
  extraClasses: "",
  buttonType: "",
};

Button.propTypes = {
  handleClick: PropTypes.func,
  label: PropTypes.string,
  buttonType: PropTypes.string,
  extraClasses: PropTypes.string,
};

export default Button;
