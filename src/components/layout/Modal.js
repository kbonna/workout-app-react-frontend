import React from "react";
import ReactDOM from "react-dom";
import { classNames } from "utilities/misc";
import styles from "./Modal.module.scss";

const Modal = ({ isOpen = true, handleClose, className, children }) => {
  const classList = classNames({
    [styles.Modal]: true,
    [className]: Boolean(className),
  });

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.Overlay} onClick={handleClose}></div>
      <div className={classList}>
        <button className={styles.Modal_closeButton} onClick={handleClose}>
          &#215;
        </button>
        {children}
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
