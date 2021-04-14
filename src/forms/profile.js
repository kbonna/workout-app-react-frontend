import { validateOneOf } from "utilities/validators";
import { GENDER_TYPES, GENDER_TYPES_DISPLAY } from "utilities/models";

const fieldProps = {
  _simpleFields: ["firstName", "lastName", "country", "city", "dateOfBirth", "gender"],
  firstName: {
    label: "First name",
    htmlName: "firstName",
    placeholder: "first name",
  },
  lastName: {
    label: "Last name",
    htmlName: "lastName",
    placeholder: "last name",
  },
  country: {
    label: "Country",
    htmlName: "country",
    placeholder: "country",
  },
  city: {
    label: "City",
    htmlName: "city",
    placeholder: "city",
  },
  dateOfBirth: {
    label: "Date of birth",
    htmlName: "dateOfBirth",
    placeholder: "date of birth",
    type: "date",
  },
  gender: {
    label: "Gender",
    htmlName: "gender",
    placeholder: "gender",
    options: GENDER_TYPES,
    optionsDisplay: GENDER_TYPES_DISPLAY,
    validators: [validateOneOf(GENDER_TYPES.concat([""]) , "Incorrect gender.")],
  },
};

const formErrorsFromUserDataErrors = (userDataErrors) => {
  console.log(userDataErrors);
  const errors = {
    firstName: "first_name" in userDataErrors ? userDataErrors.first_name : [],
    lastName: "last_name" in userDataErrors ? userDataErrors.last_name : [],
  };
  if ("profile" in userDataErrors) {
    const profile = userDataErrors.profile;
    errors.country = "country" in profile ? profile.country : [];
    errors.city = "city" in profile ? profile.city : [];
    errors.dateOfBirth = "date_of_birth" in profile ? profile.date_of_birth : [];
    errors.gender = "gender" in profile ? profile.gender : [];
  }
  return errors;
};

const formDataFromUserData = (userData) => {
  const values = {
    firstName: userData.first_name,
    lastName: userData.last_name,
    country: userData.profile.country,
    city: userData.profile.city,
    dateOfBirth: userData.profile.date_of_birth || "",
    gender: userData.profile.gender,
  };
  const errors = {
    firstName: [],
    lastName: [],
    country: [],
    city: [],
    dateOfBirth: [],
    gender: [],
  };
  return { values, errors };
};

const userDataFromFormData = (formData) => ({
  first_name: formData.values.firstName,
  last_name: formData.values.lastName,
  profile: {
    country: formData.values.country,
    city: formData.values.city,
    date_of_birth: formData.values.dateOfBirth || null,
    gender: formData.values.gender,
  },
});

export { fieldProps, formDataFromUserData, userDataFromFormData, formErrorsFromUserDataErrors };
