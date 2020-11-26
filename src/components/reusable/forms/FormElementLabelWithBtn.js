import React from "react";
import PropTypes from "prop-types";

import FormElementLabel from "./FormElementLabel";
import styles from "./FormElementLabelWithBtn.module.scss";

function FormElementLabelWithBtn({ name, title, shouldRenderAddBtn, onClick }) {
  return (
    <div className={styles["label-wrapper"]}>
      <FormElementLabel name={name} title={title}></FormElementLabel>
      {shouldRenderAddBtn && (
        <button className={styles.btn} onClick={onClick} type="button">
          +
        </button>
      )}
    </div>
  );
}

FormElementLabelWithBtn.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  shouldRenderAddBtn: PropTypes.bool,
  onClick: PropTypes.func,
};

export default FormElementLabelWithBtn;
