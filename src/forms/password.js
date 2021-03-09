import { validateEmpty, validateLength } from "utilities/validators";

const formDataInitial = {
  values: {
    password: "",
    repeatedPassword: "",
  },
  errors: {
    password: [],
    repeatedPassword: [],
  },
};

const fieldProps = {
  _simpleFields: ["password", "repeatedPassword"],
  password: {
    label: "Password",
    htmlName: "password",
    placeholder: "password",
    type: "password",
    validators: [
      validateEmpty("Please provide password."),
      validateLength(4, "Password should be at least 4 characters long."),
    ],
  },
  repeatedPassword: {
    label: "Repeat password",
    htmlName: "repeatedPassword",
    placeholder: "repeat password",
    type: "password",
    validators: [validateEmpty("Please repeat your password.")],
  },
};

export { fieldProps, formDataInitial };
