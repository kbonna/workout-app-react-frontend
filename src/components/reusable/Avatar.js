import React from "react";
import { classNames } from "utilities/misc";
import styles from "./Avatar.module.scss";

const Avatar = ({ src, className, rest }) => {
  const classList = classNames({
    [styles.avatar]: true,
    [className]: className !== undefined,
  });

  return <img src={src} alt={"avatar"} className={classList} {...rest}></img>;
};

export default Avatar;
