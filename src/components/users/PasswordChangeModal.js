import React, { useReducer } from "react";
import { useUser } from "context/UserProvider";
import { useNotify } from "context/NotificationProvider";

import Modal from "components/layout/Modal";
import Input from "components/form_elements/Input";
import Button from "components/reusable/Button";
import styles from "./PasswordChangeModal.module.scss";

import { formReducer, handleChangeField, validateForm, FORM_ACTIONS } from "reducers/form";
import { formDataInitial, fieldProps } from "forms/password";
import { validateRepeatedPassword } from "utilities/validators";
import { updateUserPassword } from "services/users";

const PasswordChangeModal = ({ handleClose }) => {
  const [formData, dispatch] = useReducer(formReducer, formDataInitial);
  const user = useUser();
  const notify = useNotify();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = Promise.all([
      validateForm(fieldProps, formData),
      validateRepeatedPassword(
        formData.values.password,
        formData.values.repeatedPassword,
        "repeatedPassword"
      ),
    ]);

    validate
      .then(() => {
        updateUserPassword(user.pk, formData.values.password)
          .then(() => {
            handleClose();
            notify({
              message: "Password changed sucessfully!",
              type: "success",
            });
          })
          .catch((errors) => {
            dispatch({
              type: FORM_ACTIONS.UPDATE_ERRORS,
              errors: { username: [errors.message] },
            });
          });
      })
      .catch((errors) => {
        dispatch({
          type: FORM_ACTIONS.UPDATE_ERRORS,
          errors,
        });
      });
  };

  return (
    <Modal handleClose={handleClose} className={styles.Modal}>
      <h2 className={styles.Modal_title}>New password</h2>
      <form className={styles.Form}>
        <fieldset className={styles.Form_fieldset}>
          <Input
            className={styles.Form_input}
            label={fieldProps.password.label}
            name={fieldProps.password.htmlName}
            type={fieldProps.password.type}
            placeholder={fieldProps.password.placeholder}
            onChange={handleChangeField(dispatch)}
            value={formData.values.password}
            error={formData.errors.password}
          ></Input>
          <Input
            className={styles.Form_input}
            label={fieldProps.repeatedPassword.label}
            name={fieldProps.repeatedPassword.htmlName}
            type={fieldProps.repeatedPassword.type}
            placeholder={fieldProps.repeatedPassword.placeholder}
            onChange={handleChangeField(dispatch)}
            value={formData.values.repeatedPassword}
            error={formData.errors.repeatedPassword}
          ></Input>
          <Button
            className={styles.Form_submitButton}
            type={"submit"}
            buttonType={"dark"}
            handleClick={handleSubmit}
            label={"Change password"}
          ></Button>
        </fieldset>
      </form>
    </Modal>
  );
};

export default PasswordChangeModal;
