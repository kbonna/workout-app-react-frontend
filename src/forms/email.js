import { validateEmail, validateEmpty } from "utilities/validators";

const formDataInitial = {
  values: {
    email: "",
  },
  errors: {
    email: [],
  },
};

const fieldProps = {
  _simpleFields: ["email"],
  email: {
    label: "Email",
    htmlName: "email",
    placeholder: "email",
    type: "email",
    validators: [validateEmpty("Please provide your email."), validateEmail()],
  },
};

export { fieldProps, formDataInitial };
