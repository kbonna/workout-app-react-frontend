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

export {
  validateEmpty,
  validateLength,
  validateOneOf,
  validateAllowedCharacters,
};
