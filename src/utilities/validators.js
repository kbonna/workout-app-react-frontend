const validateEmpty = (msg) => {
  msg = typeof msg !== "undefined" ? msg : "This field cannot be empty.";
  const validate = (value) => {
    if (value === "") {
      throw new Error(msg);
    }
  };
  return validate;
};

const validateLength = (minLength, msg) => {
  msg =
    typeof msg !== "undefined"
      ? msg
      : `This field should be at least ${minLength} characters long.`;
  const validate = (value) => {
    if (value.length < minLength) {
      throw new Error(msg);
    }
  };
  return validate;
};

const validateOneOf = (options, msg) => {
  msg = typeof msg !== "undefined" ? msg : `Invalid choice provided.`;
  const validate = (value) => {
    if (!options.includes(value)) {
      throw new Error(msg);
    }
  };
  return validate;
};

const validateAllowedCharacters = (allowedCharacters, msg) => {
  msg = typeof msg !== "undefined" ? msg : "Invalid characters used.";
  const validate = (value) => {
    if (![...value].every((ch) => allowedCharacters.includes(ch))) {
      throw new Error(msg);
    }
  };
  return validate;
};

const validateRange = (minValue, maxValue, msg) => {
  msg =
    typeof msg !== "undefined"
      ? msg
      : `Value should be greater than ${minValue} and less than ${maxValue}`;
  const validate = (value) => {
    if ((value < minValue) | (value > maxValue)) {
      throw new Error(msg);
    }
  };
  return validate;
};

const validateEmail = (msg) => {
  msg = typeof msg !== "undefined" ? msg : "Incorrect email address.";
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validate = (value) => {
    if (!re.test(String(value).toLowerCase())) {
      throw new Error(msg);
    }
  };
  return validate;
};

// multi-field validator
const validateRepeatedPassword = (password1, password2, errorFieldName) =>
  new Promise((resolve, reject) => {
    if (password1 === password2) {
      resolve();
    } else {
      reject({ [errorFieldName]: ["Passwords are not matching."] });
    }
  });

export {
  validateRange,
  validateEmpty,
  validateLength,
  validateOneOf,
  validateAllowedCharacters,
  validateEmail,
  validateRepeatedPassword,
};
