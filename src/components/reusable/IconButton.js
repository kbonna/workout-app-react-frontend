import React from "react";
import PropTypes from "prop-types";
import styles from "./IconButton.module.scss";
import { classNames } from "utilities/misc";

function IconButton({ children, onClick, className, ...rest }) {
  const buttonClasses = classNames({
    [styles.button]: true,
    [className]: className !== undefined,
  });

  return (
    <button onClick={onClick} className={buttonClasses} {...rest}>
      {children}
    </button>
  );
}

IconButton.defaultProps = {
  className: null,
};

IconButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  handleClick: PropTypes.func,
};

export default IconButton;
