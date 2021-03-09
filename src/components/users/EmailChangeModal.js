import Modal from "components/layout/Modal";
import React, { useReducer } from "react";
import { formReducer, handleChangeField, validateForm, FORM_ACTIONS } from "reducers/form";
import { formDataInitial, fieldProps } from "forms/email";
import styles from "./EmailChangeModal.module.scss";
import Input from "components/form_elements/Input";
import Button from "components/reusable/Button";
import { updateUserEmail } from "services/users";
import { useUser } from "context/UserProvider";
import { useNotify } from "context/NotificationProvider";

const EmailChangeModal = ({ handleClose, setUserData }) => {
  const [formData, dispatch] = useReducer(formReducer, formDataInitial);
  const user = useUser();
  const notify = useNotify();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validateForm(fieldProps, formData);
      const response = await updateUserEmail(user.pk, formData.values.email);
      handleClose();
      setUserData((userData) => ({ ...userData, ...response }));
      notify({
        message: "Email changed sucessfully!",
        type: "success",
      });
    } catch (errors) {
      dispatch({
        type: FORM_ACTIONS.UPDATE_ERRORS,
        errors,
      });
    }
  };

  return (
    <Modal handleClose={handleClose} className={styles.Modal}>
      <h2 className={styles.Modal_title}>New email</h2>
      <form className={styles.Form}>
        <fieldset className={styles.Form_fieldset}>
          <Input
            className={styles.Form_input}
            label={fieldProps.email.label}
            name={fieldProps.email.htmlName}
            type={fieldProps.email.type}
            placeholder={fieldProps.email.placeholder}
            onChange={handleChangeField(dispatch)}
            value={formData.values.email}
            error={formData.errors.email}
          ></Input>
          <Button
            className={styles.Form_submitButton}
            type={"submit"}
            buttonType={"dark"}
            handleClick={handleSubmit}
            label={"Change email"}
          ></Button>
        </fieldset>
      </form>
    </Modal>
  );
};

export default EmailChangeModal;
