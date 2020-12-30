import { validateEmpty, validateLength } from "utilities/validators";

const formDataInitial = {
  values: {
    username: "",
    password: "",
    repeatPassword: "",
  },
  errors: {
    username: [],
    password: [],
    repeatPassword: [],
  },
};

const fieldProps = {
  _simpleFields: ["username", "password", "repeatPassword"],
  username: {
    label: "Username",
    htmlName: "username",
    placeholder: "username",
    type: "text",
    validators: [
      validateEmpty("Please provide username."),
      validateLength(3, "Username should be at least 3 characters long."),
    ],
  },
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
  repeatPassword: {
    label: "Repeat password",
    htmlName: "repeatPassword",
    placeholder: "repeat password",
    type: "password",
    validators: [validateEmpty("Please repeat your password.")],
  },
};

export { fieldProps, formDataInitial };
