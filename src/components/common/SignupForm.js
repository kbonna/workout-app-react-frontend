import React, { useReducer } from "react";
import { useAuth } from "context/AuthProvider";
import { useHistory } from "react-router-dom";
import routes from "utilities/routes";

import Input from "components/form_elements/Input";
import Button from "components/reusable/Button";
import styles from "./SignupForm.module.scss";

import { fieldProps, formDataInitial } from "forms/signup";
import { formReducer, FORM_ACTIONS, validateForm } from "reducers/form";
import { useNotify } from "context/NotificationProvider";

function SignupForm(props) {
  const [formData, dispatch] = useReducer(formReducer, formDataInitial);
  const { signup } = useAuth();
  const notify = useNotify();
  let history = useHistory();

  console.log(formData);

  const validateFormCustom = (formData) =>
    new Promise((resolve, reject) => {
      if (formData.values.password === formData.values.repeatPassword) {
        resolve();
      } else {
        reject({ repeatPassword: ["Passwords are not matching."] });
      }
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validateForm(fieldProps, formData);
      await validateFormCustom(formData);
      await signup(formData.values);
      notify({
        message: `Account ${formData.values.username} successfully created.`,
        type: "success",
      });
      history.push(routes.app.dashboard.self);
    } catch (errors) {
      dispatch({
        type: FORM_ACTIONS.SET_ERRORS,
        errors,
      });
    }
  };

  const handleChange = (e) => {
    dispatch({
      type: FORM_ACTIONS.CHANGE_FIELD,
      name: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Register</h1>
      <fieldset className={styles.fieldset}>
        <Input
          className={styles.input}
          label={fieldProps.username.label}
          name={fieldProps.username.htmlName}
          type={fieldProps.username.type}
          placeholder={fieldProps.username.placeholder}
          onChange={handleChange}
          value={formData.values.username}
          error={formData.errors.username}
        ></Input>
        <Input
          className={styles.input}
          label={fieldProps.email.label}
          name={fieldProps.email.htmlName}
          type={fieldProps.email.type}
          placeholder={fieldProps.email.placeholder}
          onChange={handleChange}
          value={formData.values.email}
          error={formData.errors.email}
        ></Input>
        <Input
          className={styles.input}
          label={fieldProps.password.label}
          name={fieldProps.password.htmlName}
          type={fieldProps.password.type}
          placeholder={fieldProps.password.placeholder}
          onChange={handleChange}
          value={formData.values.password}
          error={formData.errors.password}
        ></Input>
        <Input
          className={styles.input}
          label={fieldProps.repeatPassword.label}
          name={fieldProps.repeatPassword.htmlName}
          type={fieldProps.repeatPassword.type}
          placeholder={fieldProps.repeatPassword.placeholder}
          onChange={handleChange}
          value={formData.values.repeatPassword}
          error={formData.errors.repeatPassword}
        ></Input>
      </fieldset>
      <div className={styles.buttons}>
        <Button
          className={styles["buttons__signup"]}
          type={"submit"}
          buttonType={"dark"}
          handleClick={handleSubmit}
          label={"Create account"}
        ></Button>
      </div>
      <a className={styles.link} href={routes.login}>
        Already have an account?
      </a>
    </form>
  );
}

export default SignupForm;
