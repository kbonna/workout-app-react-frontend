import React from "react";

import LeftArrow from "components/icons/LeftArrow";
import IconButton from "./IconButton";
import styles from "./GoBack.module.scss";
import { classNames } from "utilities/misc";

const GoBack = ({ history, className }) => {
  const classList = classNames({
    [styles.button]: true,
    [className]: className !== undefined,
  });
  return (
    <IconButton onClick={history.goBack} className={classList}>
      <LeftArrow></LeftArrow>
    </IconButton>
  );
};

export default GoBack;
