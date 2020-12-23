import React from "react";
import styles from "./IconButton.module.scss";
import PropTypes from "prop-types";

function IconButton({ children, handleClick, className, ...rest }) {
  return (
    <button
      onClick={handleClick}
      className={`${styles["icon-button"]} ${className}`}
      {...rest}
    >
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
