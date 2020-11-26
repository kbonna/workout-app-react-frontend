import React from "react";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";
import { classNames } from "utilities/misc";
import { Link } from "react-router-dom";

function LinkButton({ to, label, buttonType, extraClasses, ...rest }) {
  const className = classNames({
    [styles["btn"]]: true,
    [styles[`btn--${buttonType}`]]: Boolean(buttonType),
    [extraClasses]: Boolean(extraClasses),
  });

  return (
    <Link to={to} className={className} {...rest}>
      {label}
    </Link>
  );
}

LinkButton.defaultProps = {
  extraClasses: "",
  buttonType: "",
};

LinkButton.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
  label: PropTypes.string,
  buttonType: PropTypes.string,
  extraClasses: PropTypes.string,
};

export default LinkButton;
