const validateEmpty = (msg) => {
  msg = typeof msg !== "undefined" ? msg : "This field cannot be empty.";
  const validate = (value) => {
    console.log("validating empty", value);
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
    console.log("validating length", value);
    if (value.length < minLength) {
      throw new Error(msg);
    }
  };
  return validate;
};

// const validateTwoFieldsMatching = (value1, value2, msg) => {
//   msg = typeof msg !== "undefined" ? msg : "Fields are not matching.";
//   if (value1 !== value2) {
//     throw new Error(msg);
//   }
// };

export { validateEmpty, validateLength };
