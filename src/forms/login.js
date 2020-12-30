import { validateEmpty } from "utilities/validators";

const formDataInitial = {
  values: {
    username: "",
    password: "",
  },
  errors: {
    username: [],
    password: [],
  },
};

const fieldProps = {
  _simpleFields: ["username", "password"],
  username: {
    label: "Username",
    htmlName: "username",
    placeholder: "username",
    type: "text",
    validators: [validateEmpty("Please provide username.")],
  },
  password: {
    label: "Password",
    htmlName: "password",
    placeholder: "password",
    type: "password",
    validators: [validateEmpty("Please provide password.")],
  },
};

export { fieldProps, formDataInitial };
