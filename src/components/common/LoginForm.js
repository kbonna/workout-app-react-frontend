import React, { useReducer } from "react";
import { useAuth } from "context/AuthProvider";
import { useHistory } from "react-router-dom";
import routes from "utilities/routes";
import styles from "./LoginForm.module.scss";
import Button from "components/reusable/Button";
import { fieldProps, formDataInitial } from "forms/login";
import { useNotify } from "context/NotificationProvider";
import { formReducer, FORM_ACTIONS, validateForm } from "reducers/form";
import Input from "components/form_elements/Input";

const LoginForm = (props) => {
  const [formData, dispatch] = useReducer(formReducer, formDataInitial);
  const { login } = useAuth();
  const notify = useNotify();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm(fieldProps, formData)
      .then(() => {
        login(formData.values.username, formData.values.password)
          .then(() => {
            history.push(routes.app.exercises.myExercises);
            notify({
              message: "You are logged in!",
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
          errors: errors,
        });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: FORM_ACTIONS.CHANGE_FIELD,
      name,
      value,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Log in</h1>
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
          label={fieldProps.password.label}
          name={fieldProps.password.htmlName}
          type={fieldProps.password.type}
          placeholder={fieldProps.password.placeholder}
          onChange={handleChange}
          value={formData.values.password}
          error={formData.errors.password}
        ></Input>
      </fieldset>
      <div className={styles.buttons}>
        <Button
          className={styles["buttons__login"]}
          type="submit"
          buttonType="dark"
          handleClick={handleSubmit}
          label="Submit"
        ></Button>
      </div>
      <a className={styles.link} href={routes.signup}>
        Don't have an account yet?
      </a>
    </form>
  );
};

export default LoginForm;
