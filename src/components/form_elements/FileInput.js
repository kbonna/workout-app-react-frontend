import React from "react";
import styles from "./FileInput.module.scss";
import buttonStyles from "components/reusable/Button.module.scss";
import { classNames } from "utilities/misc";

const FileInput = ({
  label = "Upload a file",
  buttonSize = "normal",
  buttonType = "dark",
  disabled = false,
  className,
  ...rest
}) => {
  const classList = classNames({
    [styles.Label]: true,
    [buttonStyles.Button]: true,
    [buttonStyles.Button__disabled]: disabled,
    [buttonStyles[`Button__${buttonType}`]]: Boolean(buttonType),
    [buttonStyles[`Button__${buttonSize}`]]: Boolean(buttonSize),
    [className]: Boolean(className),
  });

  return (
    <label className={classList}>
      {label}
      <input type="file" {...rest} />
    </label>
  );
};

export default FileInput;
