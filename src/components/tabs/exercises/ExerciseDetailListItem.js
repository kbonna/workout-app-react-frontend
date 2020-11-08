import React from "react";
import PropTypes from "prop-types";
import { classNames } from "utilities/misc";
import styles from "./ExerciseDetailListItem.module.scss";

function ExerciseDetailListItem({ icon, inner, isError }) {
  const spanClasses = classNames({
    [styles["list-item__span"]]: true,
    [styles["list-item__span--error"]]: isError,
  });

  return (
    <li className={styles["list-item"]}>
      {icon}
      <span className={spanClasses}>{inner}</span>
    </li>
  );
}

ExerciseDetailListItem.propTypes = {
  icon: PropTypes.element,
  inner: PropTypes.node,
  isError: PropTypes.bool,
};

ExerciseDetailListItem.defaultProps = {
  isError: false,
};

export default ExerciseDetailListItem;
