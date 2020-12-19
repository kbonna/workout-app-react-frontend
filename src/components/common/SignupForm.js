import React, { useReducer } from "react";
import { useAuth } from "context/AuthProvider";
import { useHistory } from "react-router-dom";
import routes from "utilities/routes";

import SimpleInput from "components/forms/SimpleInput";
import Button from "components/reusable/Button";
import styles from "./SignupForm.module.scss";

import { validateEmpty, validateLength } from "utilities/validators";

const fieldProps = {
  username: {
    title: "Username",
    name: "username",
    placeholder: "username",
    type: "text",
    validators: [
      validateEmpty("Please provide username."),
      validateLength(3, "Username should be at least 3 characters long."),
    ],
  },
  password: {
    title: "Password",
    name: "password",
    placeholder: "password",
    type: "password",
    validators: [
      validateEmpty("Please provide password."),
      validateLength(4, "Password should be at least 4 characters long."),
    ],
  },
  repeatedPassword: {
    title: "Repeat password",
    name: "repeatedPassword",
    placeholder: "password",
    type: "password",
    validators: [validateEmpty("Please repeat your password.")],
  },
};

const formDataInitial = {
  values: {
    username: "",
    password: "",
    repeatedPassword: "",
  },
  errors: {
    username: "",
    password: "",
    repeatedPassword: "",
  },
};

export const ACTIONS = {
  SET_FIELD: "set_field",
  SET_ERROR: "set_error",
  RESET_ERRORS: "reset_errors",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_FIELD:
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      };
    case ACTIONS.RESET_ERRORS:
      return {
        ...state,
        errors: formDataInitial.errors,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

function SignupForm(props) {
  const [formData, dispatch] = useReducer(formReducer, formDataInitial);
  const { signup } = useAuth();
  let history = useHistory();

  const validateForm = () => {
    dispatch({ type: ACTIONS.RESET_ERRORS });
    let isValid = true;

    for (const props of Object.values(fieldProps)) {
      try {
        if ("validators" in props) {
          props.validators.forEach((validate) => {
            validate(formData.values[props.name]);
          });
        }
      } catch (error) {
        isValid = false;
        dispatch({
          type: ACTIONS.SET_ERROR,
          field: props.name,
          error: error.message,
        });
      }
    }

    if (formData.values.password !== formData.values.repeatedPassword) {
      isValid = false;
      dispatch({
        type: ACTIONS.SET_ERROR,
        field: fieldProps.repeatedPassword.name,
        error: "Passwords does not match.",
      });
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      signup(formData.values.username, formData.values.password)
        .then(() => {
          history.push(routes.app.self);
        })
        .catch((error) => {
          dispatch({
            type: ACTIONS.SET_ERROR,
            field: fieldProps.username.name,
            error: error.message,
          });
        });
    }
  };

  const handleChange = (e) => {
    e.persist();
    dispatch({
      type: ACTIONS.SET_FIELD,
      field: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Register</h1>
      <fieldset className={styles.fieldset}>
        <SimpleInput
          className={styles.input}
          title={fieldProps.username.title}
          name={fieldProps.username.name}
          type={fieldProps.username.type}
          placeholder={fieldProps.username.placeholder}
          value={formData.values.username}
          handleChange={handleChange}
          error={formData.errors.username}
        ></SimpleInput>
        <SimpleInput
          className={styles.input}
          title={fieldProps.password.title}
          name={fieldProps.password.name}
          type={fieldProps.password.type}
          placeholder={fieldProps.password.placeholder}
          value={formData.values.password}
          handleChange={handleChange}
          error={formData.errors.password}
        ></SimpleInput>
        <SimpleInput
          className={styles.input}
          title={fieldProps.repeatedPassword.title}
          name={fieldProps.repeatedPassword.name}
          type={fieldProps.repeatedPassword.type}
          placeholder={fieldProps.repeatedPassword.placeholder}
          value={formData.values.repeatedPassword}
          handleChange={handleChange}
          error={formData.errors.repeatedPassword}
        ></SimpleInput>
      </fieldset>
      <div className={styles.buttons}>
        <Button
          extraClasses={styles["buttons__signup"]}
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
